import prisma from '../../utils/prismaClient';

interface LOG {
  id: number;
  userName: string | null;
  userQuery: string | null;
  botResponse: string | null;
  createdAt: Date;
}

const getAllLogsService = async (): Promise<LOG[]> => {
  try {
    const logs = await prisma.log.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return logs;
  } catch (error) {
    console.error('Error fetching logs:', error);
    return [];
  }
};

const createLogService = async (
  userName: string,
  userQuery: string,
  botResponse: string,
): Promise<LOG | null> => {
  try {
    const log = await prisma.log.create({
      data: { userName, userQuery, botResponse },
    });

    return log;
  } catch (error) {
    console.error('Error creating log:', error);
    return null;
  }
};

const getLogService = async (id: number): Promise<LOG | null> => {
  try {
    const log = await prisma.log.findUnique({
      where: { id },
    });
    return log;
  } catch (error) {
    console.error('Error fetching log:', error);
    return null;
  }
};

const updateLogService = async (
  id: number,
  userName: string,
  userQuery: string,
  botResponse: string,
): Promise<LOG | null> => {
  try {
    const log = await prisma.log.update({
      where: { id },
      data: { userName, userQuery, botResponse },
    });
    return log;
  } catch (error) {
    console.error('Error updating log:', error);
    return null;
  }
};

const deleteLogService = async (id: number): Promise<boolean> => {
  try {
    await prisma.log.delete({
      where: { id },
    });
    return true;
  } catch (error) {
    console.error('Error deleting log:', error);
    return false;
  }
};

export {
  getAllLogsService,
  createLogService,
  getLogService,
  updateLogService,
  deleteLogService,
};
