import { validationResult } from 'express-validator';
import ContactRequest from '../models/ContactRequest.js';
import { sendContactEmail } from '../utils/email.js';
import { createBitrixLead } from '../utils/bitrix.js';
import { verifyRecaptcha } from '../utils/recaptcha.js';

export const submitContact = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const validCaptcha = await verifyRecaptcha(req.body.recaptchaToken);
  if (!validCaptcha && process.env.RECAPTCHA_SECRET_KEY) {
    return res.status(400).json({ message: 'Проверка captcha не пройдена' });
  }

  const data = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    company: req.body.company,
    message: req.body.message,
    service: req.body.service,
    source: req.body.source || 'website',
  };

  const bitrixLeadId = await createBitrixLead(data);
  await sendContactEmail(data);

  const request = await ContactRequest.create({ ...data, bitrixLeadId });

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
