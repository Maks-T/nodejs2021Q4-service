const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const getUser = (id) => usersRepo.getUser(id);

const createUser = (user) => usersRepo.createUser(user);

module.exports = { getAll, getUser, createUser };
