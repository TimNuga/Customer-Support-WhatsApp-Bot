import 'dotenv/config';
import prisma from '../utils/prismaClient';
import OpenAI from 'openai';

interface SessionData {
  userName: string | null;
  step: number;
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const sessions: Record<string, SessionData> = {};

interface BotResponse {
  response: string;
  userName: string | null;
  userQuery: string;
}

async function handleMessage(
  message: string,
  phoneNumber: string,
): Promise<BotResponse> {
  if (!sessions[phoneNumber]) {
    sessions[phoneNumber] = { userName: null, step: 0 };
  }

  const session = sessions[phoneNumber];
  let response = '';
  let userQuery = '';

  // Step 0: greet user, ask for name
  if (session.step === 0) {
    response = `Hi! I'm Chaty, your support assistant. What's your name?`;
    session.step = 1;
    return { response, userName: session.userName, userQuery };
  }

  // Step 1: capture user name
  if (session.step === 1) {
    session.userName = message.trim();
    session.step = 2;
    response = `Nice to meet you, ${session.userName}! How can I help you today?\n(Type 'exit' or 'reset' to end.)`;
    return { response, userName: session.userName, userQuery };
  }

  // Step 2: handle queries or commands
  userQuery = message.trim().toLowerCase();

  // Provide a command to reset or exit
  if (userQuery.includes('exit') || userQuery.includes('reset')) {
    sessions[phoneNumber] = { userName: null, step: 0 };
    response = 'Session ended. Type "Hi" again to start.';
    return { response, userName: session.userName, userQuery };
  }

  // Attempt FAQ lookup
  const faqAnswer = await searchFAQ(userQuery);
  if (faqAnswer) {
    response = faqAnswer;
  } else {
    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content:
              'You are a helpful assistant that serves as a customer support chatbot, answering business related questions not currently catered for as best you can.',
          },
          { role: 'user', content: userQuery },
        ],
      });
      response = completion.choices[0].message.content as string;
    } catch (error) {
      console.error('Error querying OpenAI:', error);
      response = `I'm not sure about that. Could you rephrase?\n(Type 'exit' or 'reset' to end)`;
    }
  }

  return { response, userName: session.userName, userQuery };
}

async function searchFAQ(query: string): Promise<string | null> {
  // For simplicity, do an exact match on question
  // Adjust or add full-text search if you want
  const faq = await prisma.fAQ.findFirst({
    where: {
      question: {
        equals: query,
        mode: 'insensitive',
      },
    },
  });
  return faq ? faq.answer : null;
}

async function logQuery(
  userName: string | null,
  userQuery: string,
  botResponse: string,
) {
  try {
    await prisma.log.create({
      data: {
        userName: userName ?? '',
        userQuery,
        botResponse,
      },
    });
  } catch (error) {
    console.error('Error logging query:', error);
  }
}

export default {
  handleMessage,
  logQuery,
};
