import { IBoardData } from './board.model';

const db: IBoardData[] = [];

/**
 * Returns data of all boards from the repository
 * @returns a promise object representing an array of boards data
 */
const getAll = async (): Promise<IBoardData[]> => db;

/**
 * Returns board data from the repository
 * @param boardId - identifier of board
 * @returns a promise object representing board data or undefined if the board is not found
 */
const getBoard = async (boardId: string): Promise<IBoardData | undefined> => {
  const foundBoard = db.find((board) => board.id === boardId);

  return foundBoard;
};

/**
 * Save and return created board data from the repository
 * @param boardData - data board
 * @returns a promise object representing created board data
 */
const postBoard = async (boardData: IBoardData): Promise<IBoardData> => {
  db.push(boardData);

  return db[db.length - 1];
};

/**
 * Update and return updated board data from the repository
 * @param boardId - identifier of board
 * @param boardData - data board
 * @returns a promise object representing updated board data or null if the board does not exist
 */
const putBoard = async (
  boardId: string,
  boardData: IBoardData
): Promise<IBoardData | null> => {
  const indexBoard = db.findIndex((board) => board.id === boardId);

  if (indexBoard === -1) return null;

  Object.assign(db[indexBoard], boardData);

  return db[indexBoard];
};

/**
 * Delete and return deleted board data from the repository
 * @param boardId - identifier of board
 * @returns a promise object representing deleted board data or null if the board does not exist
 */
const deleteBoard = async (boardId: string): Promise<IBoardData | null> => {
  const indexBoard = db.findIndex((board) => board.id === boardId);

  if (indexBoard === -1) return null;

  const deletedBoard = db.splice(indexBoard, 1);

  return deletedBoard[0];
};

export default { getAll, getBoard, postBoard, putBoard, deleteBoard };
