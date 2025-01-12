"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const qrCodeController_1 = require("../controllers/qrCodeController");
const router = (0, express_1.Router)();
router.get('/', qrCodeController_1.getQRCode);
exports.default = router;
