import { Router } from 'express';
import { handleDealEvent } from '../controllers/bitrix.controller.js';

const router = Router();

/**
 * Приём событий Bitrix24 (event.bind onCrmDealUpdate).
 * Заводит повторную сделку при закрытии первичной продажи лицензии.
 */
router.post('/deal-event', handleDealEvent);

export default router;
