import boardsRepo from './board.memory.repository';
import { IBoardData } from './board.model';

const getAll = (): Promise<IBoardData[]> => boardsRepo.getAll();

const getBoard = (boardId: string): Promise<IBoardData | undefined> =>
  boardsRepo.getBoard(boardId);

const postBoard = (boardData: IBoardData): Promise<IBoardData> =>
  boardsRepo.postBoard(boardData);

const putBoard = (
  boardId: string,
  boardData: IBoardData
): Promise<IBoardData | null> => boardsRepo.putBoard(boardId, boardData);

const deleteBoard = (boardId: string): Promise<IBoardData | null> =>
  boardsRepo.deleteBoard(boardId);

export default { getAll, getBoard, postBoard, putBoard, deleteBoard };
