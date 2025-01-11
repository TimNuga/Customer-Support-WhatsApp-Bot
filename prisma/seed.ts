// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Example FAQ data
  const faqs = [
    { question: 'What are your business hours?', answer: 'We are open Monday to Friday, 9am to 5pm.' },
    { question: 'Where are you located?', answer: 'Our main office is in City, Country.' },
    { question: 'Do you offer free shipping?', answer: 'Yes, on orders above $50.' },
    { question: 'What is your return policy?', answer: 'You can return items within 30 days of purchase.' },
    { question: 'What payment methods do you accept?', answer: 'We accept major credit cards, PayPal, and Apple Pay.' },
    { question: 'Do you ship internationally?', answer: 'Yes, we ship worldwide. Shipping costs vary by destination.' },
    { question: 'How do I track my order?', answer: 'Once shipped, you’ll get a tracking link via email.' },
    { question: 'How can I contact customer service?', answer: 'Email support@example.com or call 1-800-123-4567.' },
    { question: 'Do you offer bulk discounts?', answer: 'Yes, email wholesale@example.com for pricing.' },
    { question: 'What if I receive a damaged item?', answer: 'Contact us with photos, and we’ll replace or refund it.' },
  ];

  // Upsert or Create
  for (const faqData of faqs) {
    await prisma.fAQ.upsert({
      where: { question: faqData.question },
      update: {answer: faqData.answer},
      create: faqData,
    });
  }
}

main()
  .catch((e) => {
    console.error('Error seeding FAQ:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
