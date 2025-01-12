"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const faqController_1 = require("../controllers/faqController");
const router = (0, express_1.Router)();
router.get('/', faqController_1.getAllFAQs);
router.get('/:id', faqController_1.getFAQ);
router.put('/:id', faqController_1.updateFAQ);
router.post('/', faqController_1.createFAQ);
router.delete('/:id', faqController_1.deleteFAQ);
exports.default = router;
