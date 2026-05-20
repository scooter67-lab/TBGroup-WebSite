import { validationResult } from 'express-validator';
import ContactRequest from '../models/ContactRequest.js';
import { sendContactEmail } from '../utils/email.js';
import { createBitrixLead } from '../utils/bitrix.js';
import { verifyRecaptcha } from '../utils/recaptcha.js';

export const submitContact = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: errors.array()[0]?.msg || 'Ошибка валидации',
      errors: errors.array(),
    });
  }

  const validCaptcha = await verifyRecaptcha(req.body.recaptchaToken);
  if (!validCaptcha && process.env.RECAPTCHA_SECRET_KEY) {
    return res.status(400).json({ message: 'Проверка captcha не пройдена' });
  }

  const data = {
    name: req.body.name?.trim(),
    email: req.body.email?.trim() || '',
    phone: req.body.phone?.trim() || '',
    company: req.body.company?.trim() || '',
    message: req.body.message?.trim() || '',
    service: req.body.service?.trim() || '',
    source: req.body.source || 'website',
  };

  let request;
  try {
    request = await ContactRequest.create({ ...data, status: 'new' });
  } catch (err) {
    console.error('ContactRequest save error:', err);
    return res.status(500).json({ message: 'Не удалось сохранить заявку' });
  }

  try {
    const bitrixLeadId = await createBitrixLead(data);
    if (bitrixLeadId) {
      request.bitrixLeadId = bitrixLeadId;
      await request.save();
    }
  } catch (err) {
    console.error('Bitrix24 sync error:', err.message);
  }

  try {
    await sendContactEmail(data);
  } catch (err) {
    console.error('Contact email error:', err.message);
  }

  res.status(201).json({
    message: 'Заявка успешно отправлена',
    id: request._id,
  });
};

export const getContactRequests = async (req, res) => {
  const requests = await ContactRequest.find().sort({ createdAt: -1 }).limit(100);
  res.json(requests);
};

export const updateContactStatus = async (req, res) => {
  const request = await ContactRequest.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  if (!request) return res.status(404).json({ message: 'Заявка не найдена' });
  res.json(request);
};
