import ContactRequest from '../models/ContactRequest.js';
import { sendContactEmail } from '../utils/email.js';
import { verifyRecaptcha } from '../utils/recaptcha.js';
import { normalizePhone, isValidPhone } from '../utils/phone.js';
import { addBitrix24Lead, Bitrix24Error, isBitrix24Configured } from './bitrix24.service.js';

const DUPLICATE_WINDOW_MS = 5 * 60 * 1000;

/**
 * Нормализует и проверяет данные формы перед сохранением и отправкой в CRM.
 */
export const sanitizeLeadInput = (body) => {
  const name = body.name?.trim() || '';
  const email = body.email?.trim().toLowerCase() || '';
  const phoneRaw = body.phone?.trim() || '';
  const phone = normalizePhone(phoneRaw);
  const message = body.message?.trim() || '';
  const company = body.company?.trim() || '';
  const service = body.service?.trim() || '';

  if (!name) {
    throw Object.assign(new Error('Укажите имя'), { statusCode: 400 });
  }

  if (!phone && !email) {
    throw Object.assign(new Error('Укажите телефон или email'), { statusCode: 400 });
  }

  if (phoneRaw && !isValidPhone(phoneRaw)) {
    throw Object.assign(new Error('Некорректный номер телефона'), { statusCode: 400 });
  }

  if (email && !/^\S+@\S+\.\S+$/.test(email)) {
    throw Object.assign(new Error('Некорректный email'), { statusCode: 400 });
  }

  return {
    name,
    email,
    phone: phone || phoneRaw,
    message,
    company,
    service,
    source: body.source || 'website',
  };
};

/**
 * Защита от повторной отправки: тот же телефон или email за последние 5 минут.
 */
export const assertNotDuplicate = async ({ phone, email }) => {
  const since = new Date(Date.now() - DUPLICATE_WINDOW_MS);
  const or = [];
  if (phone) or.push({ phone });
  if (email) or.push({ email });
  if (!or.length) return;

  const existing = await ContactRequest.findOne({
    createdAt: { $gte: since },
    $or: or,
  });

  if (existing) {
    throw Object.assign(
      new Error('Заявка уже отправлена. Подождите несколько минут.'),
      { statusCode: 429 }
    );
  }
};

/**
 * Полный цикл: валидация → БД → Bitrix24 → email.
 * Frontend → POST /api/lead → этот сервис → Bitrix24 REST.
 */
export const submitLead = async (body, options = {}) => {
  const { skipCaptcha = false, skipDuplicateCheck = false } = options;

  if (!skipCaptcha) {
    const validCaptcha = await verifyRecaptcha(body.recaptchaToken);
    if (!validCaptcha && process.env.RECAPTCHA_SECRET_KEY) {
      throw Object.assign(new Error('Проверка captcha не пройдена'), { statusCode: 400 });
    }
  }

  const data = sanitizeLeadInput(body);

  if (!skipDuplicateCheck) {
    await assertNotDuplicate(data);
  }

  let request;
  try {
    request = await ContactRequest.create({ ...data, status: 'new' });
  } catch (err) {
    console.error('[Lead] DB save error:', err.message);
    throw Object.assign(new Error('Не удалось сохранить заявку'), { statusCode: 500 });
  }

  let bitrixLeadId = null;

  if (isBitrix24Configured()) {
    bitrixLeadId = await addBitrix24Lead(data);
    if (bitrixLeadId) {
      request.bitrixLeadId = bitrixLeadId;
      await request.save();
    }
  }

  try {
    await sendContactEmail(data);
  } catch (err) {
    console.error('[Lead] Email notification error:', err.message);
  }

  return { request, bitrixLeadId };
};

export { Bitrix24Error };
