import { Router } from 'express';
import {
  getCases,
  getCaseBySlug,
  getCaseById,
  createCase,
  updateCase,
  deleteCase,
} from '../controllers/cases.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { optionalAuth } from '../middleware/optionalAuth.middleware.js';

const router = Router();

router.get('/', optionalAuth, getCases);
router.get('/slug/:slug', optionalAuth, getCaseBySlug);
router.get('/:id', protect, getCaseById);
router.post('/', protect, createCase);
router.put('/:id', protect, updateCase);
router.delete('/:id', protect, deleteCase);

export default router;
