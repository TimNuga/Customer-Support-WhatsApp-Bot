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
exports.deleteLogService = exports.updateLogService = exports.getLogService = exports.createLogService = exports.getAllLogsService = void 0;
const prismaClient_1 = __importDefault(require("../../utils/prismaClient"));
const getAllLogsService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const logs = yield prismaClient_1.default.log.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return logs;
    }
    catch (error) {
        console.error('Error fetching logs:', error);
        return [];
    }
});
exports.getAllLogsService = getAllLogsService;
const createLogService = (userName, userQuery, botResponse) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const log = yield prismaClient_1.default.log.create({
            data: { userName, userQuery, botResponse },
        });
        return log;
    }
    catch (error) {
        console.error('Error creating log:', error);
        return null;
    }
});
exports.createLogService = createLogService;
const getLogService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const log = yield prismaClient_1.default.log.findUnique({
            where: { id },
        });
        return log;
    }
    catch (error) {
        console.error('Error fetching log:', error);
        return null;
    }
});
exports.getLogService = getLogService;
const updateLogService = (id, userName, userQuery, botResponse) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const log = yield prismaClient_1.default.log.update({
            where: { id },
            data: { userName, userQuery, botResponse },
        });
        return log;
    }
    catch (error) {
        console.error('Error updating log:', error);
        return null;
    }
});
exports.updateLogService = updateLogService;
const deleteLogService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prismaClient_1.default.log.delete({
            where: { id },
        });
        return true;
    }
    catch (error) {
        console.error('Error deleting log:', error);
        return false;
    }
});
exports.deleteLogService = deleteLogService;
