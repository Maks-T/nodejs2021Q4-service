const User = require('./user.model');

const db = [];

const getAll = async () => {
  // TODO: mock implementation. should be replaced during task development
  return db;
};

const getUser = async (id) => {
  foundUser = db.find((user) => user.id === id);

  if (!foundUser) return false;

  return User.toResponse(foundUser);
};

const createUser = async (user) => {
  db.push(user.data);

  return User.toResponse(user);
};

module.exports = { getAll, createUser, getUser };
