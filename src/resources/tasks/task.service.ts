import { TaskEntity } from './task.entity';
import { ITaskData } from './task.model';
import { taskRepo } from './task.repository';

/**
 * Returns data of all tasks from the repository
 * @param boardId - identifier of board
 * @returns a promise object representing an array of TaskEntity
 */
const getAll = async (boardId: string): Promise<TaskEntity[]> => taskRepo().find({ where: { boardId } });

/**
 * Returns task data from the repository
 * @param boardId - identifier of board
 * @param taskId - identifier of task
 * @returns a promise object representing TaskEntity or undefined if the task is not found
 */
const getTask = async (
  boardId: string,
  taskId: string
): Promise<TaskEntity | undefined> => {
  const findedTask = await taskRepo().findOne({
    where: { id: taskId, boardId },
  });

  return findedTask;
};

/**
 * Save and return created task data from the repository
 * @param boardId - identifier of board
 * @param taskData - data task
 * @returns a promise object representing created TaskEntity
 */
const postTask = async (
  boardId: string,
  taskData: ITaskData
): Promise<TaskEntity> => {
  const createdTask = taskRepo().create({ ...taskData, boardId });
  await taskRepo().save(createdTask);
  return createdTask;
};

/**
 * Save and return updated task data from the repository
 * @param boardId - identifier of board
 * @param taskId - identifier of task
 * @param taskData - data task
 * @returns a promise object representing created TaskEntity or undefined if the task does not exist
 */
const putTask = async (
  boardId: string,
  taskId: string,
  taskData: ITaskData
): Promise<TaskEntity | undefined> => {
  const updatedTask = await taskRepo().findOne({
    where: { id: taskId, boardId },
  });
  if (updatedTask) {
    Object.assign(updatedTask, taskData);
    await taskRepo().save(updatedTask);
  }

  return updatedTask;
};

/**
 * Delete and return deleted task data from the repository
 * @param taskId - identifier of task
 * @returns a promise object representing true if task successly deleted or false if task not found
 */
const deleteTask = async (taskId: string): Promise<boolean> => {
  const result = await taskRepo().delete({ id: taskId });

  if (result.affected === 0) {
    return false;
  }
  return true;
};

export default { getAll, getTask, postTask, putTask, deleteTask };
