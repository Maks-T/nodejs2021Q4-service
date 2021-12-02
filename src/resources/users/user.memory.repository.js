const db = [];

const getAll = async () => {
  // TODO: mock implementation. should be replaced during task development
  return db;
};

const getUser = async (id) => {
  foundUser = db.find((user) => user.id === id);

  if (!foundUser) return false;

  return foundUser;
};

const createUser = async (user) => {
  db.push(user.data);

  return user.data;
};

module.exports = { getAll, getUser, createUser };
