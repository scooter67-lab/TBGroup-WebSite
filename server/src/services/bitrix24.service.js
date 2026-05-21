import axios from 'axios';

/** Ошибка при недоступности Bitrix24 (webhook настроен, но запрос не прошёл). */
export class Bitrix24Error extends Error {
  constructor(message, statusCode = 503) {
    super(message);
    this.name = 'Bitrix24Error';
    this.statusCode = statusCode;
  }
}

const SOURCE_LABEL = 'Сайт';
const REQUEST_TIMEOUT_MS = 15000;

/**
 * Базовый URL входящего webhook из .env (только backend).
 * Пример: https://company.bitrix24.ru/rest/1/xxxxxxxx/
 */
const getWebhookBaseUrl = () => {
  const url = process.env.BITRIX24_WEBHOOK_URL?.trim();
  if (!url) return null;
  return url.endsWith('/') ? url : `${url}/`;
};

/**
 * Собирает комментарий лида: сообщение + доп. поля формы.
 */
const buildComments = ({ message, company, service }) => {
  const parts = [];
  if (message) parts.push(message);
  if (company) parts.push(`Компания: ${company}`);
  if (service) parts.push(`Услуга: ${service}`);
  return parts.join('\n') || '—';
};

/**
 * Формирует fields для crm.lead.add без пустых полей.
 */
const buildLeadFields = ({ name, phone, email, message, company, service }) => {
  const fields = {
    TITLE: 'Заявка с сайта',
    NAME: name,
    COMMENTS: buildComments({ message, company, service }),
    SOURCE_DESCRIPTION: SOURCE_LABEL,
  };

  if (process.env.BITRIX24_LEAD_SOURCE_ID) {
    fields.SOURCE_ID = process.env.BITRIX24_LEAD_SOURCE_ID;
  }

  if (phone) {
    fields.PHONE = [{ VALUE: phone, VALUE_TYPE: 'WORK' }];
  }

  if (email) {
    fields.EMAIL = [{ VALUE: email, VALUE_TYPE: 'WORK' }];
  }

  return fields;
};

/**
 * Создаёт лид в Bitrix24 через REST webhook (crm.lead.add.json).
 * @returns {string|null} ID лида или null, если webhook не настроен
 * @throws {Bitrix24Error} если CRM настроена, но ответ с ошибкой
 */
export const addBitrix24Lead = async (payload) => {
  const baseUrl = getWebhookBaseUrl();
  if (!baseUrl) {
    console.warn('[Bitrix24] BITRIX24_WEBHOOK_URL не задан — лид в CRM не создаётся');
    return null;
  }

  const { name, phone, email, message, company, service } = payload;

  if (!name?.trim()) {
    throw new Bitrix24Error('Имя обязательно для создания лида', 400);
  }

  if (!phone && !email) {
    throw new Bitrix24Error('Укажите телефон или email', 400);
  }

  const fields = buildLeadFields({
    name: name.trim(),
    phone,
    email,
    message,
    company,
    service,
  });

  const url = `${baseUrl}crm.lead.add.json`;

  try {
    const { data } = await axios.post(
      url,
      { fields },
      {
        timeout: REQUEST_TIMEOUT_MS,
        headers: { 'Content-Type': 'application/json' },
      }
    );

    if (data?.error) {
      const description = data.error_description || data.error || 'Unknown Bitrix24 error';
      console.error('[Bitrix24] API error:', description);
      throw new Bitrix24Error('CRM временно недоступна. Попробуйте позже.', 503);
    }

    const leadId = data?.result?.toString() || null;
    if (leadId) {
      console.info('[Bitrix24] Lead created:', leadId);
    }
    return leadId;
  } catch (err) {
    if (err instanceof Bitrix24Error) throw err;

    const detail = err.response?.data?.error_description || err.message;
    console.error('[Bitrix24] Request failed:', detail);
    throw new Bitrix24Error('CRM временно недоступна. Попробуйте позже.', 503);
  }
};

/** Проверка, настроена ли интеграция */
export const isBitrix24Configured = () => Boolean(getWebhookBaseUrl());
