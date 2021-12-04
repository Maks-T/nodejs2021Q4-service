const db = [];

const getAll = async () => db;

const getBoard = async (id) => {
  const foundBoard = db.find((board) => board.id === id);

  return foundBoard;
};

const createBoard = async (boardData) => {
  db.push(boardData);

  return db[db.length - 1];
};

const putBoard = async (id, boardData) => {
  const indexBoard = db.findIndex((board) => board.id === id);

  if (indexBoard === -1) return null;

  Object.assign(db[indexBoard], boardData);

  return db[indexBoard];
};

const deleteBoard = async (id) => {
  const indexBoard = db.findIndex((board) => board.id === id);

  if (indexBoard === -1) return null;

  const deletedBoard = db.splice(indexBoard, 1);

  return deletedBoard;
};

module.exports = { getAll, getBoard, createBoard, putBoard, deleteBoard };
