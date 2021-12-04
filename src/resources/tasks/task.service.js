const tasksRepo = require('./task.memory.repository');

const getAll = () => tasksRepo.getAll();

const getTask = (taskId) => tasksRepo.getTask(taskId);

const createTask = (taskData) => tasksRepo.createTask(taskData);

const putTask = (taskId, taskData) => tasksRepo.putTask(taskId, taskData);

const deleteTask = (taskId) => tasksRepo.deleteTask(taskId);

module.exports = { getAll, getTask, createTask, putTask, deleteTask };
