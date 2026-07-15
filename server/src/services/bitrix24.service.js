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
 * Пример: https://company.bitrix24.kz/rest/1/xxxxxxxx/
 */
const getWebhookBaseUrl = () => {
  const url = process.env.BITRIX24_WEBHOOK_URL?.trim();
  if (!url) return null;
  return url.endsWith('/') ? url : `${url}/`;
};

/**
 * Собирает комментарий: сообщение + доп. поля формы.
 */
const buildComments = ({ message, company, service }) => {
  const parts = [];
  if (message) parts.push(message);
  if (company) parts.push(`Компания: ${company}`);
  if (service) parts.push(`Услуга: ${service}`);
  return parts.join('\n') || '—';
};

/**
 * Поля контакта для crm.contact.add.
 */
const buildContactFields = ({ name, phone, email }) => {
  const fields = {
    NAME: name,
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
 * Поля сделки для crm.deal.add (привязана к контакту).
 */
const buildDealFields = ({ name, message, company, service, contactId }) => {
  const fields = {
    TITLE: `Заявка с сайта — ${name}`,
    CONTACT_ID: contactId,
    COMMENTS: buildComments({ message, company, service }),
    SOURCE_DESCRIPTION: SOURCE_LABEL,
  };

  if (process.env.BITRIX24_LEAD_SOURCE_ID) {
    fields.SOURCE_ID = process.env.BITRIX24_LEAD_SOURCE_ID;
  }

  return fields;
};

/**
 * Вызов REST-метода Bitrix24. Возвращает result, кидает Bitrix24Error при ошибке.
 */
const callBitrix = async (baseUrl, method, fields) => {
  try {
    const { data } = await axios.post(
      `${baseUrl}${method}.json`,
      { fields },
      {
        timeout: REQUEST_TIMEOUT_MS,
        headers: { 'Content-Type': 'application/json' },
      }
    );

    if (data?.error) {
      const description = data.error_description || data.error || 'Unknown Bitrix24 error';
      console.error(`[Bitrix24] ${method} error:`, description);
      throw new Bitrix24Error('CRM временно недоступна. Попробуйте позже.', 503);
    }

    return data?.result;
  } catch (err) {
    if (err instanceof Bitrix24Error) throw err;

    const detail = err.response?.data?.error_description || err.message;
    console.error(`[Bitrix24] ${method} request failed:`, detail);
    throw new Bitrix24Error('CRM временно недоступна. Попробуйте позже.', 503);
  }
};

/**
 * Создаёт контакт + сделку в Bitrix24 через REST webhook.
 * @returns {string|null} ID сделки или null, если webhook не настроен
 * @throws {Bitrix24Error} если CRM настроена, но ответ с ошибкой
 */
export const addBitrix24Lead = async (payload) => {
  const baseUrl = getWebhookBaseUrl();
  if (!baseUrl) {
    console.warn('[Bitrix24] BITRIX24_WEBHOOK_URL не задан — сделка в CRM не создаётся');
    return null;
  }

  const { name, phone, email, message, company, service } = payload;

  if (!name?.trim()) {
    throw new Bitrix24Error('Имя обязательно для создания сделки', 400);
  }

  if (!phone && !email) {
    throw new Bitrix24Error('Укажите телефон или email', 400);
  }

  const contactId = await callBitrix(
    baseUrl,
    'crm.contact.add',
    buildContactFields({ name: name.trim(), phone, email })
  );

  if (!contactId) {
    throw new Bitrix24Error('CRM временно недоступна. Попробуйте позже.', 503);
  }
  console.info('[Bitrix24] Contact created:', contactId);

  const dealId = await callBitrix(
    baseUrl,
    'crm.deal.add',
    buildDealFields({ name: name.trim(), message, company, service, contactId })
  );

  const id = dealId?.toString() || null;
  if (id) {
    console.info('[Bitrix24] Deal created:', id, '(contact', contactId + ')');
  }
  return id;
};

/** Проверка, настроена ли интеграция */
export const isBitrix24Configured = () => Boolean(getWebhookBaseUrl());
