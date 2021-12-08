import tasksRepo from './task.memory.repository';
import { ITaskData } from './task.model';

const getAll = (): Promise<ITaskData[]> => tasksRepo.getAll();

const getTask = (taskId: string): Promise<ITaskData | undefined> =>
  tasksRepo.getTask(taskId);

const postTask = (taskData: ITaskData): Promise<ITaskData> =>
  tasksRepo.postTask(taskData);

const putTask = (
  taskId: string,
  taskData: ITaskData
): Promise<ITaskData | null> => tasksRepo.putTask(taskId, taskData);

const deleteTask = (taskId: string): Promise<ITaskData | null> =>
  tasksRepo.deleteTask(taskId);

export default { getAll, getTask, postTask, putTask, deleteTask };
