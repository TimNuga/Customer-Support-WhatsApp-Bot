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
exports.deleteLog = exports.updateLog = exports.getLog = exports.createLog = exports.getAllLogs = void 0;
const logService_1 = require("../services/logService/logService");
const getAllLogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const logs = yield (0, logService_1.getAllLogsService)();
        res.json(logs);
    }
    catch (error) {
        console.error('Error fetching logs:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getAllLogs = getAllLogs;
const createLog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, userQuery, botResponse } = req.body;
        if (!userName || !userQuery || !botResponse) {
            res
                .status(400)
                .json({ error: 'Missing userName, userQuery, or botResponse' });
            return;
        }
        const log = yield (0, logService_1.createLogService)(userName, userQuery, botResponse);
        res.status(201).json(log);
    }
    catch (error) {
        console.error('Error creating log:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.createLog = createLog;
const getLog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const log = yield (0, logService_1.getLogService)(parseInt(id));
        if (!log) {
            res.status(404).json({ error: 'Log not found' });
            return;
        }
        res.json(log);
    }
    catch (error) {
        console.error('Error fetching log:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getLog = getLog;
const updateLog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { userName, userQuery, botResponse } = req.body;
        const updatedLog = yield (0, logService_1.updateLogService)(parseInt(id), userName, userQuery, botResponse);
        if (!updatedLog) {
            res.status(404).json({ error: 'Log not found' });
            return;
        }
        res.json(updatedLog);
    }
    catch (error) {
        console.error('Error updating log:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.updateLog = updateLog;
const deleteLog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deleted = yield (0, logService_1.deleteLogService)(parseInt(id));
        if (!deleted) {
            res.status(404).json({ error: 'Log not found' });
            return;
        }
        res.status(204).send();
    }
    catch (error) {
        console.error('Error deleting log:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.deleteLog = deleteLog;
