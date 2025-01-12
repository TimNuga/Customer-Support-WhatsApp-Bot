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
exports.getQRCode = void 0;
const whatsapp_1 = require("../whatsapp");
const getQRCode = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (whatsapp_1.lastQrImage) {
        res.send(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>WhatsApp QR Code</title>
        </head>
        <body>
          <h1>Scan this QR Code to log in:</h1>
          <img src="${whatsapp_1.lastQrImage}" alt="WhatsApp QR Code" />
        </body>
        </html>
      `);
    }
    else {
        res.send('QR Code not generated yet. Please try again later.');
    }
});
exports.getQRCode = getQRCode;
