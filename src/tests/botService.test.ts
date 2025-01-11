import prisma from '../utils/prismaClient';

// Define a variable to hold the OpenAI create mock
let openaiCreateMock: jest.Mock;

// Mock the OpenAI module
jest.mock('openai', () => {
  // Initialize the mock function
  openaiCreateMock = jest.fn();
  return {
    __esModule: true,
    default: jest.fn().mockImplementation(() => ({
      chat: {
        completions: {
          create: openaiCreateMock,
        },
      },
    })),
  };
});

import botService from '../services/botService';

jest.mock('../utils/prismaClient', () => ({
  __esModule: true,
  default: {
    fAQ: {
      findFirst: jest.fn(),
    },
    log: {
      create: jest.fn(),
    },
  },
}));
describe('botService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('handleMessage', () => {
    it('should return correct response if FAQ is present', async () => {
      // Mock findFirst to return a fake FAQ
      (prisma.fAQ.findFirst as jest.Mock).mockResolvedValue({
        question: 'do you ship internationally?',
        answer: 'Yes, we ship worldwide. Shipping costs vary by destination.',
      });

      const phone = '12345';
      // Simulate user has already step=2 (captured name)
      // but let's let the code proceed
      // we can do handleMessage with "hi" first or forcibly manipulate session
      await botService.handleMessage('Alice', phone); // step=0 => step=1
      await botService.handleMessage('SomeRandom', phone); // step=1 => step=2

      // Now step=2, let's do the real check
      const { response } = await botService.handleMessage(
        'do you ship internationally?',
        phone,
      );
      expect(response).toBe(
        'Yes, we ship worldwide. Shipping costs vary by destination.',
      );

      // Checking that findFirst was called with the correct query
      expect(prisma.fAQ.findFirst).toHaveBeenCalledWith({
        where: {
          question: {
            equals: 'do you ship internationally?',
            mode: 'insensitive',
          },
        },
      });
    });

    it('should return fallback response if FAQ is not found', async () => {
      // Mock findFirst to return null (FAQ not found)
      (prisma.fAQ.findFirst as jest.Mock).mockResolvedValue(null);

      // Configure the OpenAI completions.create mock to return a fake response
      openaiCreateMock.mockResolvedValue({
        choices: [
          {
            message: {
              content: 'This is a fallback response from OpenAI.',
            },
          },
        ],
      });

      const phone = '67890';
      await botService.handleMessage('Hi', phone); // step=0 => step=1
      await botService.handleMessage('Bob', phone); // step=1 => step=2

      const { response } = await botService.handleMessage(
        'random query',
        phone,
      );

      expect(response).toBe('This is a fallback response from OpenAI.');

      // Checking that findFirst was called with the correct query
      expect(prisma.fAQ.findFirst).toHaveBeenCalledWith({
        where: {
          question: {
            equals: 'random query',
            mode: 'insensitive',
          },
        },
      });

      expect(openaiCreateMock).toHaveBeenCalled();
    });
  });

  describe('logQuery', () => {
    it('should store the log in the database', async () => {
      await botService.logQuery('Alice', 'Hello?', 'Hi Alice!');

      expect(prisma.log.create).toHaveBeenCalledWith({
        data: {
          userName: 'Alice',
          userQuery: 'Hello?',
          botResponse: 'Hi Alice!',
        },
      });
    });
  });
});
