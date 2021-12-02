const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const getUser = (id) => usersRepo.getUser(id);

const createUser = (user) => usersRepo.createUser(user);

const putUser = (id, userData) => usersRepo.putUser(id, userData);

module.exports = { getAll, getUser, createUser, putUser };
