import { Router } from 'express';
import { getDashboardStats } from '../controllers/stats.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/dashboard', protect, getDashboardStats);

export default router;
