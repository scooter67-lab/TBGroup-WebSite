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

  // Воронка сделки (crm.category.list, entityTypeId=2). Без STAGE_ID
  // сделка попадает в первую стадию этой воронки.
  if (process.env.BITRIX24_DEAL_CATEGORY_ID) {
    fields.CATEGORY_ID = process.env.BITRIX24_DEAL_CATEGORY_ID;
  }

  return fields;
};

/**
 * Ищет существующий контакт по телефону/email (crm.duplicate.findbycomm),
 * чтобы не плодить дубли. Возвращает ID или null.
 * Ошибка поиска не критична — тогда создаём новый контакт.
 */
const findExistingContactId = async (baseUrl, { phone, email }) => {
  const lookups = [];
  if (phone) lookups.push(['PHONE', phone]);
  if (email) lookups.push(['EMAIL', email]);

  for (const [type, value] of lookups) {
    try {
      const { data } = await axios.get(`${baseUrl}crm.duplicate.findbycomm.json`, {
        params: { entity_type: 'CONTACT', type, 'values[]': value },
        timeout: REQUEST_TIMEOUT_MS,
      });
      const ids = data?.result?.CONTACT;
      if (Array.isArray(ids) && ids.length) return ids[0].toString();
    } catch (err) {
      console.warn('[Bitrix24] duplicate search failed:', err.message);
    }
  }
  return null;
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

  let contactId = await findExistingContactId(baseUrl, { phone, email });

  if (contactId) {
    console.info('[Bitrix24] Existing contact reused:', contactId);
  } else {
    contactId = await callBitrix(
      baseUrl,
      'crm.contact.add',
      buildContactFields({ name: name.trim(), phone, email })
    );

    if (!contactId) {
      throw new Bitrix24Error('CRM временно недоступна. Попробуйте позже.', 503);
    }
    console.info('[Bitrix24] Contact created:', contactId);
  }

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

// ── Продление лицензий: сделки и повторные сделки ────────────────────────────

/** GET-запрос к Bitrix REST (для *.get / *.list). */
const callBitrixGet = async (baseUrl, method, params) => {
  try {
    const { data } = await axios.get(`${baseUrl}${method}.json`, {
      params,
      timeout: REQUEST_TIMEOUT_MS,
    });
    if (data?.error) {
      const description = data.error_description || data.error;
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

/** Поля сделки по ID (или null, если webhook не настроен). */
export const getDeal = async (id) => {
  const baseUrl = getWebhookBaseUrl();
  if (!baseUrl) return null;
  return callBitrixGet(baseUrl, 'crm.deal.get', { id });
};

/**
 * Ищет шаблон повторной сделки по базовой сделке.
 * @returns {string|null} ID шаблона или null.
 */
export const findRecurringByBaseId = async (baseId) => {
  const baseUrl = getWebhookBaseUrl();
  if (!baseUrl) return null;
  const result = await callBitrixGet(baseUrl, 'crm.deal.recurring.list', {
    'filter[BASED_ID]': baseId,
    'select[]': 'ID',
  });
  const items = Array.isArray(result) ? result : result?.items || [];
  return items.length ? String(items[0].ID) : null;
};

/**
 * Создаёт шаблон повторной сделки (ежемесячно) на базе существующей сделки.
 * @returns {string|null} ID созданного шаблона.
 */
export const addRecurringDeal = async ({ dealId, categoryId, startDate }) => {
  const baseUrl = getWebhookBaseUrl();
  if (!baseUrl) return null;
  const fields = {
    DEAL_ID: dealId,
    CATEGORY_ID: String(categoryId),
    ACTIVE: 'Y',
    START_DATE: startDate,
    PARAMS: {
      MODE: 'multiple',
      MULTIPLE_TYPE: 'month',
      MULTIPLE_INTERVAL: 1,
    },
  };
  const result = await callBitrix(baseUrl, 'crm.deal.recurring.add', fields);
  return result?.toString() || null;
};
