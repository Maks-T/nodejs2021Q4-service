"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db = [];
/**
 * Returns data of all users from the repository
 * @returns a promise object representing an array of users data
 */
const getAll = async () => db;
/**
 * Returns user data from the repository
 * @param userId - identifier of user
 * @returns a promise object representing user data or undefined if the user is not found
 */
const getUser = async (userId) => {
    const foundUser = db.find((user) => user.id === userId);
    return foundUser;
};
/**
 * Save and return created user data from the repository
 * @param userData - data user
 * @returns a promise object representing created user data
 */
const postUser = async (userData) => {
    db.push(userData);
    return db[db.length - 1];
};
/**
 * Update and return updated user data from the repository
 * @param userId - identifier of user
 * @param userData - data user
 * @returns a promise object representing updated user data or null if the user does not exist
 */
const putUser = async (userId, userData) => {
    const indexUser = db.findIndex((user) => user.id === userId);
    if (indexUser === -1)
        return null;
    Object.assign(db[indexUser], userData);
    return db[indexUser];
};
/**
 * Delete and return deleted user data from the repository
 * @param userId - identifier of user
 * @returns a promise object representing deleted user data or null if the user does not exist
 */
const deleteUser = async (userId) => {
    const indexUser = db.findIndex((user) => user.id === userId);
    if (indexUser === -1)
        return null;
    const deletedUser = db.splice(indexUser, 1);
    return deletedUser[0];
};
exports.default = { getAll, getUser, postUser, putUser, deleteUser };
//# sourceMappingURL=user.memory.repository.js.map