import { Router } from 'express';
import { upload } from '../middleware/upload.middleware.js';
import { uploadFile, uploadMultiple } from '../controllers/upload.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/', protect, upload.single('file'), uploadFile);
router.post('/multiple', protect, upload.array('files', 10), uploadMultiple);

export default router;
