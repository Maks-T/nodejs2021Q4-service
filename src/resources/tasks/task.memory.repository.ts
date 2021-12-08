import { ITaskData } from './task.model';

const db: ITaskData[] = [];

const getAll = async (): Promise<ITaskData[]> => db;

const getTask = async (taskId: string): Promise<ITaskData | undefined> => {
  const foundTask = db.find((task: ITaskData) => task.id === taskId);

  return foundTask;
};

const postTask = async (taskData: ITaskData): Promise<ITaskData> => {
  db.push(taskData);

  return db[db.length - 1];
};

const putTask = async (
  taskId: string,
  taskData: ITaskData
): Promise<ITaskData | null> => {
  const indexTask = db.findIndex((task) => task.id === taskId);

  if (indexTask === -1) return null;

  Object.assign(db[indexTask], taskData);

  return db[indexTask];
};

const deleteTask = async (taskId: string): Promise<ITaskData | null> => {
  const indexTask = db.findIndex((task) => task.id === taskId);

  if (indexTask === -1) return null;

  const deletedTask = db.splice(indexTask, 1);

  return deletedTask[0];
};

export default { getAll, getTask, postTask, putTask, deleteTask };
