import { Router } from 'express';
import {
  submitContact,
  getContactRequests,
  updateContactStatus,
} from '../controllers/contact.controller.js';
import { leadValidators } from '../controllers/lead.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/', leadValidators, submitContact);

router.get('/', protect, getContactRequests);
router.patch('/:id', protect, updateContactStatus);

export default router;
