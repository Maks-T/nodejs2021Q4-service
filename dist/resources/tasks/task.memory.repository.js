"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db = [];
/**
 * Returns data of all tasks from the repository
 * @returns a promise object representing an array of tasks data
 */
const getAll = async () => db;
/**
 * Returns task data from the repository
 * @param taskId - identifier of task
 * @returns a promise object representing task data or undefined if the task is not found
 */
const getTask = async (taskId) => {
    const foundTask = db.find((task) => task.id === taskId);
    return foundTask;
};
/**
 * Save and return created task data from the repository
 * @param taskData - data task
 * @returns a promise object representing created task data
 */
const postTask = async (taskData) => {
    db.push(taskData);
    return db[db.length - 1];
};
/**
 * Update and return updated task data from the repository
 * @param taskId - identifier of task
 * @param taskData - data task
 * @returns a promise object representing updated task data or null if the task does not exist
 */
const putTask = async (taskId, taskData) => {
    const indexTask = db.findIndex((task) => task.id === taskId);
    if (indexTask === -1)
        return null;
    Object.assign(db[indexTask], taskData);
    return db[indexTask];
};
/**
 * Delete and return deleted task data from the repository
 * @param taskId - identifier of task
 * @returns a promise object representing deleted task data or null if the task does not exist
 */
const deleteTask = async (taskId) => {
    const indexTask = db.findIndex((task) => task.id === taskId);
    if (indexTask === -1)
        return null;
    const deletedTask = db.splice(indexTask, 1);
    return deletedTask[0];
};
exports.default = { getAll, getTask, postTask, putTask, deleteTask };
//# sourceMappingURL=task.memory.repository.js.map