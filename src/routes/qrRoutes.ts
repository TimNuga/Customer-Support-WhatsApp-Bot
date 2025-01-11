import { Router } from 'express';
import { getQRCode } from '../controllers/qrCodeController';

const router = Router();

router.get('/', getQRCode);

export default router;
