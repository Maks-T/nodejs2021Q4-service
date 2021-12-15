"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const task_service_1 = __importDefault(require("./task.service"));
const board_service_1 = __importDefault(require("../boards/board.service"));
const validaty_1 = __importDefault(require("../../common/validaty"));
const task_model_1 = require("./task.model");
/**
 * Description
 * @param req - object represents the HTTP request
 * @param res - object represents the HTTP response
 * @param handlerTask - callback function which calls if board is founded
 * @returns a promise object resolves to void
 */
const isBoardFound = async (req, res, handlerTask) => {
    const { boardId } = req.params;
    if (!(0, validaty_1.default)(boardId)) {
        res
            .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .send({ message: `Board id = ${boardId} is not valid` });
    }
    else {
        const foundBoard = await board_service_1.default.getBoard(boardId);
        if (foundBoard) {
            handlerTask();
        }
        else {
            res
                .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                .send({ message: `Board with id = ${boardId} was not found` });
        }
    }
};
/**
 * Accesses the repository to send all task data without password to client
 * @param req - object represents the HTTP request
 * @param res - object represents the HTTP response
 * @returns a promise object resolves to void
 */
const getAll = async (req, res) => {
    try {
        isBoardFound(req, res, async () => {
            const allTasks = await task_service_1.default.getAll();
            res.status(http_status_codes_1.StatusCodes.OK).send(allTasks);
        });
    }
    catch (e) {
        res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .send({ message: `Internal Server Error [getAllTasks] ${e}` });
    }
};
/**
 * Accesses the repository to send task data without password to client
 * @param req - object represents the HTTP request
 * @param res - object represents the HTTP response
 * @returns a promise object resolves to void
 */
const getTask = async (req, res) => {
    try {
        isBoardFound(req, res, async () => {
            const { taskId } = req.params;
            if ((0, validaty_1.default)(taskId)) {
                const foundTask = await task_service_1.default.getTask(taskId);
                if (foundTask) {
                    res.status(http_status_codes_1.StatusCodes.OK).send(foundTask);
                }
                else {
                    res
                        .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                        .send({ message: `Task with id = ${taskId} was not found` });
                }
            }
            else {
                res
                    .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                    .send({ message: `Task id = ${taskId} is not valid` });
            }
        });
    }
    catch (e) {
        res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .send({ message: `Internal Server Error [getTask] ${e}` });
    }
};
/**
 * Accesses the repository to create and send task data without password to client
 * @param req - object represents the HTTP request
 * @param res - object represents the HTTP response
 * @returns a promise object resolves to void
 */
const postTask = async (req, res) => {
    try {
        isBoardFound(req, res, async () => {
            const task = new task_model_1.Task(req.body);
            const taskData = task;
            taskData.boardId = req.params.boardId;
            const createdTask = await task_service_1.default.postTask(taskData);
            res.status(http_status_codes_1.StatusCodes.CREATED).send(createdTask);
        });
    }
    catch (e) {
        res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .send({ message: `Internal Server Error [postTask] ${e}` });
    }
};
/**
 * Accesses the repository to update and send task data without password to client
 * @param req - object represents the HTTP request
 * @param res - object represents the HTTP response
 * @returns a promise object resolves to void
 */
const putTask = async (req, res) => {
    try {
        isBoardFound(req, res, async () => {
            const { taskId } = req.params;
            if ((0, validaty_1.default)(taskId)) {
                req.body.id = taskId;
                const updateTask = await task_service_1.default.putTask(taskId, req.body);
                if (updateTask) {
                    res.status(http_status_codes_1.StatusCodes.OK).send(updateTask);
                }
                else {
                    res
                        .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                        .send({ message: `Task with id = ${taskId} was not found` });
                }
            }
            else {
                res
                    .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                    .send({ message: `Task id = ${taskId} is not valid` });
            }
        });
    }
    catch (e) {
        res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .send({ message: `Internal Server Error [putTask] ${e}` });
    }
};
const deleteTask = async (req, res) => {
    try {
        isBoardFound(req, res, async () => {
            const { taskId } = req.params;
            if ((0, validaty_1.default)(taskId)) {
                const deletedTask = await task_service_1.default.deleteTask(taskId);
                if (deletedTask) {
                    res.status(http_status_codes_1.StatusCodes.NO_CONTENT).send();
                }
                else {
                    res
                        .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                        .send({ message: `Task with id = ${taskId} was not found` });
                }
            }
            else {
                res
                    .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                    .send({ message: `Task id = ${taskId} is not valid` });
            }
        });
    }
    catch (e) {
        res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .send({ message: `Internal Server Error [deleteTask] ${e}` });
    }
};
exports.default = { getAll, getTask, postTask, putTask, deleteTask };
//# sourceMappingURL=task.controller.js.map