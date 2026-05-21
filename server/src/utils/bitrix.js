/**
 * @deprecated Используйте services/bitrix24.service.js
 * Оставлено для обратной совместимости импортов.
 */
import { addBitrix24Lead } from '../services/bitrix24.service.js';

export const createBitrixLead = (data) => addBitrix24Lead(data);
