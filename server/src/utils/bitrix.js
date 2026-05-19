import axios from 'axios';

export const createBitrixLead = async (data) => {
  const webhook = process.env.BITRIX24_WEBHOOK_URL;
  if (!webhook) {
    console.log('Bitrix24 webhook not configured');
    return null;
  }

  const comments = [
    data.message && `Сообщение: ${data.message}`,
    data.service && `Услуга: ${data.service}`,
    data.company && `Компания: ${data.company}`,
  ]
    .filter(Boolean)
    .join('\n');

  try {
    const response = await axios.post(`${webhook}crm.lead.add.json`, {
      fields: {
        TITLE: `Заявка с сайта — ${data.name}`,
        NAME: data.name,
        EMAIL: data.email ? [{ VALUE: data.email, VALUE_TYPE: 'WORK' }] : undefined,
        PHONE: data.phone ? [{ VALUE: data.phone, VALUE_TYPE: 'WORK' }] : undefined,
        COMMENTS: comments,
        SOURCE_ID: process.env.BITRIX24_LEAD_SOURCE_ID || 'WEB',
      },
    });
    return response.data?.result?.toString() || null;
  } catch (err) {
    console.error('Bitrix24 error:', err.response?.data || err.message);
    return null;
  }
};
