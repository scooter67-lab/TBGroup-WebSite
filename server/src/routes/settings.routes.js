import { Router } from 'express';
import {
  getPublicSettings,
  getAllSettings,
  upsertSetting,
  getBanners,
  createBanner,
  updateBanner,
  deleteBanner,
} from '../controllers/settings.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { optionalAuth } from '../middleware/optionalAuth.middleware.js';

const router = Router();

router.get('/public', getPublicSettings);
router.get('/banners', optionalAuth, getBanners);
router.get('/', protect, getAllSettings);
router.put('/', protect, upsertSetting);
router.post('/banners', protect, createBanner);
router.put('/banners/:id', protect, updateBanner);
router.delete('/banners/:id', protect, deleteBanner);

export default router;
