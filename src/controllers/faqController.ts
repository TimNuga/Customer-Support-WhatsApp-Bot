import { Request, Response, RequestHandler } from 'express';
import {
  getAllFAQsService,
  getFAQService,
  createFAQService,
  updateFAQService,
  deleteFAQService,
} from '../services/faqService/faqService';

export const getAllFAQs: RequestHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const faqs = await getAllFAQsService();
    res.json(faqs);
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createFAQ: RequestHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { question, answer } = req.body;
    if (!question || !answer) {
      res.status(400).json({ error: 'Missing question or answer' });
      return;
    }

    const faq = await createFAQService(question, answer);
    res.status(201).json(faq);
  } catch (error) {
    console.error('Error creating FAQ:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getFAQ: RequestHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const faq = await getFAQService(parseInt(id));
    if (!faq) {
      res.status(404).json({ error: 'FAQ not found' });
      return;
    }
    res.json(faq);
  } catch (error) {
    console.error('Error fetching FAQ:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateFAQ: RequestHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const { question, answer } = req.body;

    const updatedFAQ = await updateFAQService(parseInt(id), question, answer);
    if (!updatedFAQ) {
      res.status(404).json({ error: 'FAQ not found' });
      return;
    }
    res.json(updatedFAQ);
  } catch (error) {
    console.error('Error updating FAQ:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteFAQ: RequestHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const deleted = await deleteFAQService(parseInt(id));
    if (!deleted) {
      res.status(404).json({ error: 'FAQ not found' });
      return;
    }
    res.status(204).send({ message: 'FAQ deleted successfully' });
  } catch (error) {
    console.error('Error deleting FAQ:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
