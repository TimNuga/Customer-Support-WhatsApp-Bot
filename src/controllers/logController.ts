import { Request, Response, RequestHandler } from 'express';
import {
  getAllLogsService,
  getLogService,
  createLogService,
  updateLogService,
  deleteLogService,
} from '../services/logService/logService';

export const getAllLogs: RequestHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const logs = await getAllLogsService();
    res.json(logs);
  } catch (error) {
    console.error('Error fetching logs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createLog: RequestHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { userName, userQuery, botResponse } = req.body;
    if (!userName || !userQuery || !botResponse) {
      res
        .status(400)
        .json({ error: 'Missing userName, userQuery, or botResponse' });
      return;
    }

    const log = await createLogService(userName, userQuery, botResponse);
    res.status(201).json(log);
  } catch (error) {
    console.error('Error creating log:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getLog: RequestHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const log = await getLogService(parseInt(id));
    if (!log) {
      res.status(404).json({ error: 'Log not found' });
      return;
    }
    res.json(log);
  } catch (error) {
    console.error('Error fetching log:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateLog: RequestHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const { userName, userQuery, botResponse } = req.body;

    const updatedLog = await updateLogService(
      parseInt(id),
      userName,
      userQuery,
      botResponse,
    );
    if (!updatedLog) {
      res.status(404).json({ error: 'Log not found' });
      return;
    }
    res.json(updatedLog);
  } catch (error) {
    console.error('Error updating log:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteLog: RequestHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const deleted = await deleteLogService(parseInt(id));
    if (!deleted) {
      res.status(404).json({ error: 'Log not found' });
      return;
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting log:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
