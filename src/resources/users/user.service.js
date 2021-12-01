const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const getUser = () => usersRepo.getUser();

module.exports = { getAll, getUser };
