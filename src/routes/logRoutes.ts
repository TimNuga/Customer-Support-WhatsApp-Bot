// src/routes/logRoutes.ts
import { Router } from 'express';
import {
  getAllLogs,
  createLog,
  getLog,
  updateLog,
  deleteLog,
} from '../controllers/logController';

const router = Router();

router.get('/', getAllLogs);
router.get('/:id', getLog);
router.put('/:id', updateLog);
router.post('/', createLog);
router.delete('/:id', deleteLog);

export default router;
