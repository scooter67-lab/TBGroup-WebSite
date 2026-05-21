import { validationResult } from 'express-validator';
import ContactRequest from '../models/ContactRequest.js';
import { submitLead } from '../services/lead.service.js';
import { Bitrix24Error } from '../services/bitrix24.service.js';

/**
 * POST /api/contact — совместимость со старым URL (логика как у /api/lead).
 */
export const submitContact = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: errors.array()[0]?.msg || 'Ошибка валидации',
      errors: errors.array(),
    });
  }

  try {
    const { request, bitrixLeadId } = await submitLead(req.body);

    return res.status(201).json({
      message: 'Заявка успешно отправлена',
      id: request._id,
      bitrixLeadId: bitrixLeadId || undefined,
    });
  } catch (err) {
    if (err instanceof Bitrix24Error) {
      return res.status(err.statusCode).json({
        message: err.message,
        crmUnavailable: true,
      });
    }

    const status = err.statusCode || 500;
    return res.status(status).json({
      message: err.message || 'Ошибка отправки заявки',
    });
  }
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
