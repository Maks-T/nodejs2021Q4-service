"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const board_memory_repository_1 = __importDefault(require("./board.memory.repository"));
/**
 * Returns data of all boards from the repository
 * @returns a promise object representing an array of boards data
 */
const getAll = () => board_memory_repository_1.default.getAll();
/**
 * Returns board data from the repository
 * @param boardId - identifier of board
 * @returns a promise object representing board data or undefined if the board is not found
 */
const getBoard = (boardId) => board_memory_repository_1.default.getBoard(boardId);
/**
 * Save and return created board data from the repository
 * @param boardData - data board
 * @returns a promise object representing created board data or null if the board does not exist
 */
const postBoard = (boardData) => board_memory_repository_1.default.postBoard(boardData);
const putBoard = (boardId, boardData) => board_memory_repository_1.default.putBoard(boardId, boardData);
/**
 * Delete and return deleted board data from the repository
 * @param boardId - identifier of board
 * @returns a promise object representing deleted board data or null if the board does not exist
 */
const deleteBoard = (boardId) => board_memory_repository_1.default.deleteBoard(boardId);
exports.default = { getAll, getBoard, postBoard, putBoard, deleteBoard };
//# sourceMappingURL=board.service.js.map