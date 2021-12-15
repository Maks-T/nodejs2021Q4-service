"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const validaty_1 = __importDefault(require("../../common/validaty"));
const task_service_1 = __importDefault(require("../tasks/task.service"));
const user_model_1 = require("./user.model");
const user_service_1 = __importDefault(require("./user.service"));
/**
 * Accesses the repository to send all user data without password to client
 * @param req - object represents the HTTP request
 * @param res - object represents the HTTP response
 * @returns a promise object resolves to void
 */
const getAll = async (req, res) => {
    try {
        const allUsers = await user_service_1.default.getAll();
        // map user fields to exclude secret fields like "password"
        allUsers.map(user_model_1.User.toResponse);
        res.status(http_status_codes_1.StatusCodes.OK).send(allUsers);
    }
    catch (e) {
        res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .send({ message: `Internal Server Error [getAllUsers] ${e}` });
    }
};
/**
 * Accesses the repository to send user data without password to client
 * @param req - object represents the HTTP request
 * @param res - object represents the HTTP response
 * @returns a promise object resolves to void
 */
const getUser = async (req, res) => {
    try {
        const { userId } = req.params;
        if ((0, validaty_1.default)(userId)) {
            const foundUser = await user_service_1.default.getUser(userId);
            if (foundUser) {
                res.status(http_status_codes_1.StatusCodes.OK).send(user_model_1.User.toResponse(foundUser));
            }
            else {
                res
                    .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                    .send({ message: `User with id = ${userId} was not found` });
            }
        }
        else {
            res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .send({ message: `User id = ${userId} is not valid` });
        }
    }
    catch (e) {
        res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .send({ message: `Internal Server Error [getUser]` });
    }
};
/**
 * Accesses the repository to create and send user data without password to client
 * @param req - object represents the HTTP request
 * @param res - object represents the HTTP response
 * @returns a promise object resolves to void
 */
const postUser = async (req, res) => {
    try {
        if (req.body.id)
            delete req.body.id;
        const user = new user_model_1.User(req.body);
        const createdUser = await user_service_1.default.postUser(user);
        res.status(http_status_codes_1.StatusCodes.CREATED).send(user_model_1.User.toResponse(createdUser));
    }
    catch (e) {
        res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .send({ message: `Internal Server Error [postUser] ${e}` });
    }
};
/**
 * Accesses the repository to update and send user data without password to client
 * @param req - object represents the HTTP request
 * @param res - object represents the HTTP response
 * @returns a promise object resolves to void
 */
const putUser = async (req, res) => {
    try {
        const { userId } = req.params;
        if ((0, validaty_1.default)(userId)) {
            req.body.id = userId;
            const updateUser = await user_service_1.default.putUser(userId, req.body);
            if (updateUser) {
                res.status(http_status_codes_1.StatusCodes.OK).send(user_model_1.User.toResponse(updateUser));
            }
            else {
                res
                    .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                    .send({ message: `User with id = ${userId} was not found` });
            }
        }
        else {
            res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .send({ message: `User id = ${userId} is not valid` });
        }
    }
    catch (e) {
        res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .send({ message: `Internal Server Error [putUser] ${e}` });
    }
};
/**
 * Accesses the repository to delete user data and unsubscribe from the user in all tasks
 * @param req - object represents the HTTP request
 * @param res - object represents the HTTP response
 * @returns a promise object resolves to void
 */
const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        if ((0, validaty_1.default)(userId)) {
            const deletedUser = await user_service_1.default.deleteUser(userId);
            if (deletedUser) {
                const allTasks = await task_service_1.default.getAll();
                const updateTasks = allTasks.filter((task) => task.userId === userId);
                updateTasks.forEach((task) => {
                    const updateTask = task;
                    updateTask.userId = null;
                    task_service_1.default.putTask(updateTask.id, updateTask);
                });
                res.status(http_status_codes_1.StatusCodes.NO_CONTENT).send();
            }
            else {
                res
                    .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                    .send({ message: `User with id = ${userId} was not found` });
            }
        }
        else {
            res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .send({ message: `User id = ${userId} is not valid` });
        }
    }
    catch (e) {
        res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .send({ message: `Internal Server Error [deleteUser] ${e}` });
    }
};
exports.default = { getAll, getUser, postUser, putUser, deleteUser };
//# sourceMappingURL=user.controller.js.map