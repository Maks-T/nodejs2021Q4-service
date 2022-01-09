import usersRepo from './user.memory.repository';
import { IUserData } from './user.model';

/**
 * Returns data of all users from the repository
 * @returns a promise object representing an array of users data
 */
const getAll = (): Promise<IUserData[]> => usersRepo.getAll();

/**
 * Returns user data from the repository
 * @param userId - identifier of user
 * @returns a promise object representing user data or undefined if the user is not found
 */
const getUser = (userId: string): Promise<IUserData | undefined> =>
  usersRepo.getUser(userId);

/**
 * Save and return created user data from the repository
 * @param userData - data user
 * @returns a promise object representing created user data
 */
const postUser = (userData: IUserData): Promise<IUserData> =>
  usersRepo.postUser(userData);

/**
 * Update and return updated user data from the repository
 * @param userId - identifier of user
 * @param userData - data user
 * @returns a promise object representing updated user data or null if the user does not exist
 */
const putUser = (
  userId: string,
  userData: IUserData
): Promise<IUserData | null> => usersRepo.putUser(userId, userData);

/**
 * Delete and return deleted user data from the repository
 * @param userId - identifier of user
 * @returns a promise object representing deleted user data or null if the user does not exist
 */
const deleteUser = (userId: string): Promise<IUserData | null> =>
  usersRepo.deleteUser(userId);

export default { getAll, getUser, postUser, putUser, deleteUser };
