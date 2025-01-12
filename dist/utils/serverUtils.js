"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = startServer;
exports.stopServer = stopServer;
const server_1 = __importDefault(require("../server"));
let server = null;
function startServer(port) {
    if (!server) {
        server = server_1.default.listen(port, () => {
            console.log(`Server listening on port ${port}`);
        });
    }
    return server;
}
function stopServer() {
    if (server) {
        server.close();
        server = null;
    }
}
