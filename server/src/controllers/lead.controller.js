import { validationResult, body } from 'express-validator';
import { submitLead, Bitrix24Error } from '../services/lead.service.js';
import { isValidPhone } from '../utils/phone.js';

/** Правила валидации для POST /api/lead */
export const leadValidators = [
  body('name').trim().notEmpty().withMessage('Укажите имя'),
  body('email').optional({ values: 'falsy' }).isEmail().withMessage('Некорректный email'),
  body('phone')
    .optional({ values: 'falsy' })
    .trim()
    .custom((value) => {
      if (!value) return true;
      if (!isValidPhone(value)) throw new Error('Некорректный номер телефона');
      return true;
    }),
  body('message').optional({ values: 'falsy' }).trim(),
  body('company').optional({ values: 'falsy' }).trim(),
  body('service').optional({ values: 'falsy' }).trim(),
  body().custom((_value, { req }) => {
    const phone = req.body.phone?.trim();
    const email = req.body.email?.trim();
    if (!phone && !email) {
      throw new Error('Укажите телефон или email');
    }
    return true;
  }),
];

/**
 * POST /api/lead — приём заявки с сайта и создание лида в Bitrix24.
 */
export const createLead = async (req, res) => {
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
      console.error('[Lead] Bitrix24:', err.message);
      return res.status(err.statusCode).json({
        message: err.message,
        crmUnavailable: true,
      });
    }

    const status = err.statusCode || 500;
    if (status >= 500) {
      console.error('[Lead] Error:', err.message);
    }

    return res.status(status).json({
      message: err.message || 'Ошибка отправки заявки',
    });
  }
};
