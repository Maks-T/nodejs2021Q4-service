import { ITaskData } from './task.model';

const db: ITaskData[] = [];

/**
 * Returns data of all tasks from the repository
 * @returns a promise object representing an array of tasks data
 */
const getAll = async (): Promise<ITaskData[]> => db;

/**
 * Returns task data from the repository
 * @param taskId - identifier of task
 * @returns a promise object representing task data or undefined if the task is not found
 */
const getTask = async (taskId: string): Promise<ITaskData | undefined> => {
  const foundTask = db.find((task: ITaskData) => task.id === taskId);

  return foundTask;
};

/**
 * Save and return created task data from the repository
 * @param taskData - data task
 * @returns a promise object representing created task data
 */
const postTask = async (taskData: ITaskData): Promise<ITaskData> => {
  db.push(taskData);

  return db[db.length - 1];
};

/**
 * Update and return updated task data from the repository
 * @param taskId - identifier of task
 * @param taskData - data task
 * @returns a promise object representing updated task data or null if the task does not exist
 */
const putTask = async (
  taskId: string,
  taskData: ITaskData
): Promise<ITaskData | null> => {
  const indexTask = db.findIndex((task) => task.id === taskId);

  if (indexTask === -1) return null;

  Object.assign(db[indexTask], taskData);

  return db[indexTask];
};

/**
 * Delete and return deleted task data from the repository
 * @param taskId - identifier of task
 * @returns a promise object representing deleted task data or null if the task does not exist
 */
const deleteTask = async (taskId: string): Promise<ITaskData | null> => {
  const indexTask = db.findIndex((task) => task.id === taskId);

  if (indexTask === -1) return null;

  const deletedTask = db.splice(indexTask, 1);

  return deletedTask[0];
};

export default { getAll, getTask, postTask, putTask, deleteTask };
