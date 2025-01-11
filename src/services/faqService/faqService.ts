import prisma from '../../utils/prismaClient';

interface FAQ {
  id: number;
  question: string;
  answer: string;
  createdAt: Date;
}

const getAllFAQsService = async (): Promise<FAQ[]> => {
  try {
    const faqs = await prisma.fAQ.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return faqs;
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    return [];
  }
};

const createFAQService = async (
  question: string,
  answer: string,
): Promise<FAQ | null> => {
  try {
    const existingFAQ = await prisma.fAQ.findUnique({
      where: { question },
    });
    if (existingFAQ) {
      console.error('FAQ already exists');
      return null;
    }
    const faq = await prisma.fAQ.create({
      data: { question, answer },
    });

    return faq;
  } catch (error) {
    console.error('Error creating FAQ:', error);
    return null;
  }
};

const getFAQService = async (id: number): Promise<FAQ | null> => {
  try {
    const faq = await prisma.fAQ.findUnique({
      where: { id },
    });
    return faq;
  } catch (error) {
    console.error('Error fetching FAQ:', error);
    return null;
  }
};

const updateFAQService = async (
  id: number,
  question: string,
  answer: string,
): Promise<FAQ | null> => {
  try {
    const faq = await prisma.fAQ.update({
      where: { id },
      data: { question, answer },
    });
    return faq;
  } catch (error) {
    console.error('Error updating FAQ:', error);
    return null;
  }
};

const deleteFAQService = async (id: number): Promise<boolean> => {
  try {
    await prisma.fAQ.delete({
      where: { id },
    });
    return true;
  } catch (error) {
    console.error('Error deleting FAQ:', error);
    return false;
  }
};

export {
  getAllFAQsService,
  createFAQService,
  getFAQService,
  updateFAQService,
  deleteFAQService,
};
