"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const board_service_1 = __importDefault(require("./board.service"));
const validaty_1 = __importDefault(require("../../common/validaty"));
const board_model_1 = require("./board.model");
const task_service_1 = __importDefault(require("../tasks/task.service"));
/**
 * Accesses the repository to send all task data without password to client
 * @param req - object represents the HTTP request
 * @param res - object represents the HTTP response
 * @returns a promise object resolves to void
 */
const getAll = async (req, res) => {
    try {
        const allBoards = await board_service_1.default.getAll();
        res.status(http_status_codes_1.StatusCodes.OK).send(allBoards);
    }
    catch (e) {
        res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .send({ message: `Internal Server Error [getAllBoards] ${e}` });
    }
};
/**
 * Accesses the repository to send task data without password to client
 * @param req - object represents the HTTP request
 * @param res - object represents the HTTP response
 * @returns a promise object resolves to void
 */
const getBoard = async (req, res) => {
    try {
        const { boardId } = req.params;
        if ((0, validaty_1.default)(boardId)) {
            const foundBoard = await board_service_1.default.getBoard(boardId);
            if (foundBoard) {
                res.status(http_status_codes_1.StatusCodes.OK).send(foundBoard);
            }
            else {
                res
                    .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                    .send({ message: `Board with id = ${boardId} was not found` });
            }
        }
        else {
            res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .send({ message: `Board id = ${boardId} is not valid` });
        }
    }
    catch (e) {
        res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .send({ message: `Internal Server Error [getBoard] ${e}` });
    }
};
/**
 * Accesses the repository to create and send task data without password to client
 * @param req - object represents the HTTP request
 * @param res - object represents the HTTP response
 * @returns a promise object resolves to void
 */
const postBoard = async (req, res) => {
    try {
        const board = new board_model_1.Board(req.body);
        const createdBoard = await board_service_1.default.postBoard(board);
        res.status(http_status_codes_1.StatusCodes.CREATED).send(createdBoard);
    }
    catch (e) {
        res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .send({ message: `Internal Server Error [postBoard] ${e}` });
    }
};
/**
 * Accesses the repository to update and send task data without password to client
 * @param req - object represents the HTTP request
 * @param res - object represents the HTTP response
 * @returns a promise object resolves to void
 */
const putBoard = async (req, res) => {
    try {
        const { boardId } = req.params;
        if ((0, validaty_1.default)(boardId)) {
            req.body.id = boardId;
            const updateBoard = await board_service_1.default.putBoard(boardId, req.body);
            if (updateBoard) {
                res.status(http_status_codes_1.StatusCodes.OK).send(updateBoard);
            }
            else {
                res
                    .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                    .send({ message: `Board with id = ${boardId} was not found` });
            }
        }
        else {
            res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .send({ message: `Board id = ${boardId} is not valid` });
        }
    }
    catch (e) {
        res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .send({ message: `Internal Server Error [putBoard] ${e} ${e}` });
    }
};
/**
 * Accesses the repository to delete task data and unsubscribe from the task in all tasks
 * @param req - object represents the HTTP request
 * @param res - object represents the HTTP response
 * @returns a promise object resolves to void
 */
const deleteBoard = async (req, res) => {
    try {
        const { boardId } = req.params;
        if ((0, validaty_1.default)(boardId)) {
            const deletedBoard = await board_service_1.default.deleteBoard(boardId);
            if (deletedBoard) {
                const allTasks = await task_service_1.default.getAll();
                const deleteTasks = allTasks.filter((task) => task.boardId === boardId);
                deleteTasks.forEach((task) => {
                    task_service_1.default.deleteTask(task.id);
                });
                res.status(http_status_codes_1.StatusCodes.NO_CONTENT).send();
            }
            else {
                res
                    .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                    .send({ message: `Board with id = ${boardId} was not found` });
            }
        }
        else {
            res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .send({ message: `Board id = ${boardId} is not valid` });
        }
    }
    catch (e) {
        res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .send({ message: `Internal Server Error [deleteBoard]` });
    }
};
exports.default = { getAll, getBoard, postBoard, putBoard, deleteBoard };
//# sourceMappingURL=board.controller.js.map