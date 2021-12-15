"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const task_memory_repository_1 = __importDefault(require("./task.memory.repository"));
/**
 * Returns data of all tasks from the repository
 * @returns a promise object representing an array of tasks data
 */
const getAll = () => task_memory_repository_1.default.getAll();
/**
 * Returns task data from the repository
 * @param taskId - identifier of task
 * @returns a promise object representing task data or undefined if the task is not found
 */
const getTask = (taskId) => task_memory_repository_1.default.getTask(taskId);
/**
 * Save and return created task data from the repository
 * @param taskData - data task
 * @returns a promise object representing created task data
 */
const postTask = (taskData) => task_memory_repository_1.default.postTask(taskData);
/**
 * Save and return created task data from the repository
 * @param taskData - data task
 * @returns a promise object representing created task data or null if the task does not exist
 */
const putTask = (taskId, taskData) => task_memory_repository_1.default.putTask(taskId, taskData);
/**
 * Delete and return deleted task data from the repository
 * @param taskId - identifier of task
 * @returns a promise object representing deleted task data or null if the task does not exist
 */
const deleteTask = (taskId) => task_memory_repository_1.default.deleteTask(taskId);
exports.default = { getAll, getTask, postTask, putTask, deleteTask };
//# sourceMappingURL=task.service.js.map