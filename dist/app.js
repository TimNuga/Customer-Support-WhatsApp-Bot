"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const faqRoutes_1 = __importDefault(require("./routes/faqRoutes"));
const logRoutes_1 = __importDefault(require("./routes/logRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Simple health check
app.get('/', (req, res) => {
    res.send('Customer Support WhatsApp Bot API is running.');
});
// Register routes ß
app.use('/api/faqs', faqRoutes_1.default);
app.use('/api/logs', logRoutes_1.default);
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
exports.default = app;
