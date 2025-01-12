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
exports.deleteFAQService = exports.updateFAQService = exports.getFAQService = exports.createFAQService = exports.getAllFAQsService = void 0;
const prismaClient_1 = __importDefault(require("../../utils/prismaClient"));
const getAllFAQsService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const faqs = yield prismaClient_1.default.fAQ.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return faqs;
    }
    catch (error) {
        console.error('Error fetching FAQs:', error);
        return [];
    }
});
exports.getAllFAQsService = getAllFAQsService;
const createFAQService = (question, answer) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingFAQ = yield prismaClient_1.default.fAQ.findUnique({
            where: { question },
        });
        if (existingFAQ) {
            console.error('FAQ already exists');
            return null;
        }
        const faq = yield prismaClient_1.default.fAQ.create({
            data: { question, answer },
        });
        return faq;
    }
    catch (error) {
        console.error('Error creating FAQ:', error);
        return null;
    }
});
exports.createFAQService = createFAQService;
const getFAQService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const faq = yield prismaClient_1.default.fAQ.findUnique({
            where: { id },
        });
        return faq;
    }
    catch (error) {
        console.error('Error fetching FAQ:', error);
        return null;
    }
});
exports.getFAQService = getFAQService;
const updateFAQService = (id, question, answer) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const faq = yield prismaClient_1.default.fAQ.update({
            where: { id },
            data: { question, answer },
        });
        return faq;
    }
    catch (error) {
        console.error('Error updating FAQ:', error);
        return null;
    }
});
exports.updateFAQService = updateFAQService;
const deleteFAQService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prismaClient_1.default.fAQ.delete({
            where: { id },
        });
        return true;
    }
    catch (error) {
        console.error('Error deleting FAQ:', error);
        return false;
    }
});
exports.deleteFAQService = deleteFAQService;
