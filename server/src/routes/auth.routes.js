import { Router } from 'express';
import { body } from 'express-validator';
import { login, getMe } from '../controllers/auth.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = Router();

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Введите корректный email'),
    body('password').notEmpty().withMessage('Введите пароль'),
  ],
  login
);

router.get('/me', protect, getMe);

export default router;
