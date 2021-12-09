import tasksRepo from './task.memory.repository';
import { ITaskData } from './task.model';

/**
 * Returns data of all tasks from the repository
 * @returns a promise object representing an array of tasks data
 */
const getAll = (): Promise<ITaskData[]> => tasksRepo.getAll();

/**
 * Returns task data from the repository
 * @param taskId - identifier of task
 * @returns a promise object representing task data or undefined if the task is not found
 */
const getTask = (taskId: string): Promise<ITaskData | undefined> =>
  tasksRepo.getTask(taskId);

/**
 * Save and return created task data from the repository
 * @param taskData - data task
 * @returns a promise object representing created task data
 */
const postTask = (taskData: ITaskData): Promise<ITaskData> =>
  tasksRepo.postTask(taskData);

/**
 * Save and return created task data from the repository
 * @param taskData - data task
 * @returns a promise object representing created task data
 */
const putTask = (
  taskId: string,
  taskData: ITaskData
): Promise<ITaskData | null> => tasksRepo.putTask(taskId, taskData);

/**
 * Delete and return deleted task data from the repository
 * @param taskId - identifier of task
 * @returns a promise object representing deleted task data or null if the task does not exist
 */
const deleteTask = (taskId: string): Promise<ITaskData | null> =>
  tasksRepo.deleteTask(taskId);

export default { getAll, getTask, postTask, putTask, deleteTask };
