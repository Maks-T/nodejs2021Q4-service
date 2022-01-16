import { IBoardData } from './board.model';
import { BoardEntity } from './board.entity';
import { boardRepo } from './board.repository';
/**
 * Returns data of all boards from the repository
 * @returns a promise object representing an array of boards data
 */
const getAll = (): Promise<IBoardData[]> => boardRepo().find();

/**
 * Returns board data from the repository
 * @param boardId - identifier of board
 * @returns a promise object representing board data or undefined if the board is not found
 */
const getBoard = async (boardId: string): Promise<BoardEntity | undefined> => {
  const findedBoard = await boardRepo().findOne(boardId);
  return findedBoard;
};

/**
 * Save and return created board data from the repository
 * @param boardData - data board
 * @returns a promise object representing created board data or null if the board does not exist
 */
const postBoard = async (boardData: IBoardData): Promise<BoardEntity> => {
  const createdBoard = boardRepo().create(boardData);
  await boardRepo().save(createdBoard);
  return createdBoard;
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
): Promise<BoardEntity | undefined> => {
  const updatedBoard = await boardRepo().findOne(boardId);
  if (updatedBoard) {
    Object.assign(updatedBoard, boardData);
    await boardRepo().save(updatedBoard);
  }
  return updatedBoard;
};
/**
 * Delete and return deleted board data from the repository
 * @param boardId - identifier of board
 * @returns a promise object representing deleted board data or null if the board does not exist
 */
const deleteBoard = async (boardId: string): Promise<boolean> => {
  const result = await boardRepo().delete(boardId);

  if (result.affected === 0) {
    return false;
  }
  return true;
};

export default { getAll, getBoard, postBoard, putBoard, deleteBoard };
