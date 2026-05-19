import { Router } from 'express';
import { body } from 'express-validator';
import {
  getReviews,
  createReview,
  createReviewAdmin,
  updateReview,
  deleteReview,
  moderateReview,
} from '../controllers/reviews.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { optionalAuth } from '../middleware/optionalAuth.middleware.js';

const router = Router();

router.get('/', optionalAuth, getReviews);
router.post(
  '/',
  [
    body('author').notEmpty().withMessage('Укажите имя'),
    body('rating').optional().isInt({ min: 1, max: 5 }),
  ],
  createReview
);
router.post('/admin', protect, createReviewAdmin);
router.put('/:id', protect, updateReview);
router.patch('/:id/moderate', protect, moderateReview);
router.delete('/:id', protect, deleteReview);

export default router;
