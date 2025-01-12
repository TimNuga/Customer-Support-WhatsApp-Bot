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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFAQ = exports.updateFAQ = exports.getFAQ = exports.createFAQ = exports.getAllFAQs = void 0;
const faqService_1 = require("../services/faqService/faqService");
const getAllFAQs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const faqs = yield (0, faqService_1.getAllFAQsService)();
        res.json(faqs);
    }
    catch (error) {
        console.error('Error fetching FAQs:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getAllFAQs = getAllFAQs;
const createFAQ = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { question, answer } = req.body;
        if (!question || !answer) {
            res.status(400).json({ error: 'Missing question or answer' });
            return;
        }
        const faq = yield (0, faqService_1.createFAQService)(question, answer);
        res.status(201).json(faq);
    }
    catch (error) {
        console.error('Error creating FAQ:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.createFAQ = createFAQ;
const getFAQ = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const faq = yield (0, faqService_1.getFAQService)(parseInt(id));
        if (!faq) {
            res.status(404).json({ error: 'FAQ not found' });
            return;
        }
        res.json(faq);
    }
    catch (error) {
        console.error('Error fetching FAQ:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getFAQ = getFAQ;
const updateFAQ = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { question, answer } = req.body;
        const updatedFAQ = yield (0, faqService_1.updateFAQService)(parseInt(id), question, answer);
        if (!updatedFAQ) {
            res.status(404).json({ error: 'FAQ not found' });
            return;
        }
        res.json(updatedFAQ);
    }
    catch (error) {
        console.error('Error updating FAQ:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.updateFAQ = updateFAQ;
const deleteFAQ = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deleted = yield (0, faqService_1.deleteFAQService)(parseInt(id));
        if (!deleted) {
            res.status(404).json({ error: 'FAQ not found' });
            return;
        }
        res.status(204).send({ message: 'FAQ deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting FAQ:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.deleteFAQ = deleteFAQ;
