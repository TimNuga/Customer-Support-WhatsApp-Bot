import { Router } from 'express';
import {
  getAllFAQs,
  createFAQ,
  getFAQ,
  updateFAQ,
  deleteFAQ,
} from '../controllers/faqController';

const router = Router();

router.get('/', getAllFAQs);
router.get('/:id', getFAQ);
router.put('/:id', updateFAQ);
router.post('/', createFAQ);
router.delete('/:id', deleteFAQ);

export default router;
