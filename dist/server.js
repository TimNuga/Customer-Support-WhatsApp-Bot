"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const yamljs_1 = __importDefault(require("yamljs"));
const faqRoutes_1 = __importDefault(require("./routes/faqRoutes"));
const logRoutes_1 = __importDefault(require("./routes/logRoutes"));
const qrRoutes_1 = __importDefault(require("./routes/qrRoutes"));
require("./whatsapp");
// Load Swagger API documentation
const swaggerDocument = yamljs_1.default.load('swagger.yaml');
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Swagger API documentation
app.use('/api/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
// Simple health check
app.get('/', (req, res) => {
    res.send('Customer Support WhatsApp Bot API is running.');
});
// Register routes
app.use('/api/faqs', faqRoutes_1.default);
app.use('/api/logs', logRoutes_1.default);
app.use('/api/qrcode', qrRoutes_1.default);
// Starting the server
const PORT = process.env.PORT || 4000;
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
}
exports.default = app;
