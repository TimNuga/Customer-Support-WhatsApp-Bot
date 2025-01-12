"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/logRoutes.ts
const express_1 = require("express");
const logController_1 = require("../controllers/logController");
const router = (0, express_1.Router)();
router.get('/', logController_1.getAllLogs);
router.get('/:id', logController_1.getLog);
router.put('/:id', logController_1.updateLog);
router.post('/', logController_1.createLog);
router.delete('/:id', logController_1.deleteLog);
exports.default = router;
