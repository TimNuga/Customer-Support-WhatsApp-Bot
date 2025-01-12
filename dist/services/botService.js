"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const prismaClient_1 = __importDefault(require("../utils/prismaClient"));
const openai_1 = __importDefault(require("openai"));
const openai = new openai_1.default({ apiKey: process.env.OPENAI_API_KEY });
const sessions = {};
function handleMessage(message, phoneNumber) {
    return __awaiter(this, void 0, void 0, function* () {
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
        const faqAnswer = yield searchFAQ(userQuery);
        if (faqAnswer) {
            response = faqAnswer;
        }
        else {
            try {
                const completion = yield openai.chat.completions.create({
                    model: 'gpt-3.5-turbo',
                    messages: [
                        {
                            role: 'system',
                            content: 'You are a helpful assistant that serves as a customer support chatbot, answering business related questions not currently catered for as best you can, while maintaining basic interaction principles.',
                        },
                        { role: 'user', content: userQuery },
                    ],
                });
                response = completion.choices[0].message.content;
            }
            catch (error) {
                console.error('Error querying OpenAI:', error);
                response = `I'm not sure about that. Could you rephrase?\n(Type 'exit' or 'reset' to end)`;
            }
        }
        return { response, userName: session.userName, userQuery };
    });
}
function searchFAQ(query) {
    return __awaiter(this, void 0, void 0, function* () {
        const faq = yield prismaClient_1.default.fAQ.findFirst({
            where: {
                question: {
                    equals: query,
                    mode: 'insensitive',
                },
            },
        });
        return faq ? faq.answer : null;
    });
}
function logQuery(userName, userQuery, botResponse) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield prismaClient_1.default.log.create({
                data: {
                    userName: userName !== null && userName !== void 0 ? userName : '',
                    userQuery,
                    botResponse,
                },
            });
        }
        catch (error) {
            console.error('Error logging query:', error);
        }
    });
}
exports.default = {
    handleMessage,
    logQuery,
};
