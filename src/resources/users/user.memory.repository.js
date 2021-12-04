const db = [];

const getAll = async () => db;

const getUser = async (id) => {
  const foundUser = db.find((user) => user.id === id);

  return foundUser;
};

const createUser = async (userData) => {
  db.push(userData);

  return db[db.length - 1];
};

const putUser = async (id, userData) => {
  const indexUser = db.findIndex((user) => user.id === id);

  if (indexUser === -1) return null;

  Object.assign(db[indexUser], userData);

  return db[indexUser];
};

const deleteUser = async (id) => {
  const indexUser = db.findIndex((user) => user.id === id);

  if (indexUser === -1) return null;

  const deletedUser = db.splice(indexUser, 1);

  return deletedUser;
};

module.exports = { getAll, getUser, createUser, putUser, deleteUser };
