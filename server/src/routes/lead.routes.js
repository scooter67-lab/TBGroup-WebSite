import { Router } from 'express';
import { createLead, leadValidators } from '../controllers/lead.controller.js';

const router = Router();

/**
 * Публичный endpoint для форм сайта.
 * Frontend → POST /api/lead → Bitrix24 crm.lead.add
 */
router.post('/', leadValidators, createLead);

export default router;
