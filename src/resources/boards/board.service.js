const boardsRepo = require("./board.memory.repository");

const getAll = () => boardsRepo.getAll();

const getBoard = (id) => boardsRepo.getBoard(id);

const createBoard = (board) => boardsRepo.createBoard(board);

const putBoard = (id, boardData) => boardsRepo.putBoard(id, boardData);

const deleteBoard = (id) => boardsRepo.deleteBoard(id);

module.exports = { getAll, getBoard, createBoard, putBoard, deleteBoard };
