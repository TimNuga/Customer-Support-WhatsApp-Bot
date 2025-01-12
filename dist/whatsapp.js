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
exports.lastQrImage = void 0;
const qrcode_terminal_1 = __importDefault(require("qrcode-terminal"));
const whatsapp_web_js_1 = require("whatsapp-web.js");
const botService_1 = __importDefault(require("./services/botService"));
const qrcode_1 = __importDefault(require("qrcode"));
// Use LocalAuth so session persists locally
const client = new whatsapp_web_js_1.Client({
    authStrategy: new whatsapp_web_js_1.LocalAuth(),
});
exports.lastQrImage = null;
// Generate QR Code for login
client.on('qr', (qrString) => {
    // Generating terminal QR
    qrcode_terminal_1.default.generate(qrString, { small: true });
    // Storing a data URL so it can be displayed in the browser
    qrcode_1.default
        .toDataURL(qrString)
        .then((dataUrl) => {
        exports.lastQrImage = dataUrl;
    })
        .catch((err) => {
        console.error('Error generating QR for browser:', err);
    });
});
// Notify when ready
client.on('ready', () => {
    console.log('WhatsApp client is ready!');
});
// Handle incoming messages
client.on('message', (msg) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { from, body } = msg;
        const { response, userName, userQuery } = yield botService_1.default.handleMessage(body, from);
        // Send the response
        client.sendMessage(from, response);
        // Log queries if needed
        // (We call the service directly, or you can call your API endpoint)
        yield botService_1.default.logQuery(userName, userQuery, response);
    }
    catch (error) {
        console.error('Error handling incoming message:', error);
    }
}));
// Initialize the client
client.initialize();
exports.default = client;
