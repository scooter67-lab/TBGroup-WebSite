import { Router } from 'express';
import { body } from 'express-validator';
import {
  submitContact,
  getContactRequests,
  updateContactStatus,
} from '../controllers/contact.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = Router();

router.post(
  '/',
  [
    body('name').trim().notEmpty().withMessage('Укажите имя'),
    body('email').optional({ values: 'falsy' }).isEmail().withMessage('Некорректный email'),
    body('phone').optional({ values: 'falsy' }).trim(),
    body('company').optional({ values: 'falsy' }).trim(),
    body('message').optional({ values: 'falsy' }).trim(),
    body('service').optional({ values: 'falsy' }).trim(),
  ],
  submitContact
);

router.get('/', protect, getContactRequests);
router.patch('/:id', protect, updateContactStatus);

export default router;
