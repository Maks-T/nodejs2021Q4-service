const db = [];

const getAll = async () => {
  // TODO: mock implementation. should be replaced during task development
  return db;
};

const getUser = async (id) => {
  foundUser = db.find((user) => user.id === id);

  return foundUser;
};

const createUser = async (user) => {
  db.push(user.data);

  return user.data;
};

const putUser = async (id, userData) => {
  indexUser = db.findIndex((user) => user.id === id);

  if (indexUser === -1) return null;

  delete userData.id;

  Object.assign(db[indexUser], userData);

  return db[indexUser];
};

module.exports = { getAll, getUser, createUser, putUser };
