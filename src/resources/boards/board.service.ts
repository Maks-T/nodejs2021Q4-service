import boardsRepo from './board.memory.repository';
import { IBoardData } from './board.model';

/**
 * Returns data of all boards from the repository
 * @returns a promise object representing an array of boards data
 */
const getAll = (): Promise<IBoardData[]> => boardsRepo.getAll();

/**
 * Returns board data from the repository
 * @param boardId - identifier of board
 * @returns a promise object representing board data or undefined if the board is not found
 */
const getBoard = (boardId: string): Promise<IBoardData | undefined> =>
  boardsRepo.getBoard(boardId);

/**
 * Save and return created board data from the repository
 * @param boardData - data board
 * @returns a promise object representing created board data or null if the board does not exist
 */
const postBoard = (boardData: IBoardData): Promise<IBoardData> =>
  boardsRepo.postBoard(boardData);

/**
 * Update and return updated board data from the repository
 * @param boardId - identifier of board
 * @param boardData - data board
 * @returns a promise object representing updated board data or null if the board does not exist
 */
const putBoard = (
  boardId: string,
  boardData: IBoardData
): Promise<IBoardData | null> => boardsRepo.putBoard(boardId, boardData);

/**
 * Delete and return deleted board data from the repository
 * @param boardId - identifier of board
 * @returns a promise object representing deleted board data or null if the board does not exist
 */
const deleteBoard = (boardId: string): Promise<IBoardData | null> =>
  boardsRepo.deleteBoard(boardId);

export default { getAll, getBoard, postBoard, putBoard, deleteBoard };
