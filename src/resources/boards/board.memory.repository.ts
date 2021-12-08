import { IBoardData } from './board.model';

const db: IBoardData[] = [];

const getAll = async (): Promise<IBoardData[]> => db;

const getBoard = async (boardId: string): Promise<IBoardData | undefined> => {
  const foundBoard = db.find((board) => board.id === boardId);

  return foundBoard;
};

const postBoard = async (boardData: IBoardData): Promise<IBoardData> => {
  db.push(boardData);

  return db[db.length - 1];
};

const putBoard = async (
  boardId: string,
  boardData: IBoardData
): Promise<IBoardData | null> => {
  const indexBoard = db.findIndex((board) => board.id === boardId);

  if (indexBoard === -1) return null;

  Object.assign(db[indexBoard], boardData);

  return db[indexBoard];
};

const deleteBoard = async (boardId: string): Promise<IBoardData | null> => {
  const indexBoard = db.findIndex((board) => board.id === boardId);

  if (indexBoard === -1) return null;

  const deletedBoard = db.splice(indexBoard, 1);

  return deletedBoard[0];
};

export default { getAll, getBoard, postBoard, putBoard, deleteBoard };
