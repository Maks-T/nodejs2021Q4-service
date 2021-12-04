const db = [];

const getAll = async () => db;

const getTask = async (id) => {
  const foundTask = db.find((task) => task.id === id);

  return foundTask;
};

const createTask = async (taskData) => {
  db.push(taskData);

  return db[db.length - 1];
};

const putTask = async (id, taskData) => {
  const indexTask = db.findIndex((task) => task.id === id);

  if (indexTask === -1) return null;

  Object.assign(db[indexTask], taskData);

  return db[indexTask];
};

const deleteTask = async (id) => {
  const indexTask = db.findIndex((task) => task.id === id);

  if (indexTask === -1) return null;

  const deletedTask = db.splice(indexTask, 1);

  return deletedTask;
};

module.exports = { getAll, getTask, createTask, putTask, deleteTask };
