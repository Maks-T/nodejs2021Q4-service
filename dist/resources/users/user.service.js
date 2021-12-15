"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_memory_repository_1 = __importDefault(require("./user.memory.repository"));
/**
 * Returns data of all users from the repository
 * @returns a promise object representing an array of users data
 */
const getAll = () => user_memory_repository_1.default.getAll();
/**
 * Returns user data from the repository
 * @param userId - identifier of user
 * @returns a promise object representing user data or undefined if the user is not found
 */
const getUser = (userId) => user_memory_repository_1.default.getUser(userId);
/**
 * Save and return created user data from the repository
 * @param userData - data user
 * @returns a promise object representing created user data
 */
const postUser = (userData) => user_memory_repository_1.default.postUser(userData);
/**
 * Update and return updated user data from the repository
 * @param userId - identifier of user
 * @param userData - data user
 * @returns a promise object representing updated user data or null if the user does not exist
 */
const putUser = (userId, userData) => user_memory_repository_1.default.putUser(userId, userData);
/**
 * Delete and return deleted user data from the repository
 * @param userId - identifier of user
 * @returns a promise object representing deleted user data or null if the user does not exist
 */
const deleteUser = (userId) => user_memory_repository_1.default.deleteUser(userId);
exports.default = { getAll, getUser, postUser, putUser, deleteUser };
//# sourceMappingURL=user.service.js.map