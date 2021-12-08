import { IUserData } from './user.model';

const db: IUserData[] = [];

/**
 * Returns data of all users from the repository
 * @returns a promise object representing an array of users data
 */
const getAll = async (): Promise<IUserData[]> => db;

/**
 * Returns user data from the repository
 * @param userId - identifier of user
 * @returns a promise object representing user data or undefined if the user is not found
 */
const getUser = async (userId: string): Promise<IUserData | undefined> => {
  const foundUser = db.find((user) => user.id === userId);

  return foundUser;
};

/**
 * Save and return created user data from the repository
 * @param userData - data user
 * @returns a promise object representing created user data
 */
const postUser = async (userData: IUserData): Promise<IUserData> => {
  db.push(userData);

  return db[db.length - 1];
};

/**
 * Update and return updated user data from the repository
 * @param userId - identifier of user
 * @param userData - data user
 * @returns a promise object representing updated user data or null if the user does not exist
 */
const putUser = async (
  userId: string,
  userData: IUserData
): Promise<IUserData | null> => {
  const indexUser = db.findIndex((user) => user.id === userId);

  if (indexUser === -1) return null;

  Object.assign(db[indexUser], userData);

  return db[indexUser];
};

/**
 * Delete and return deleted user data from the repository
 * @param userId - identifier of user
 * @returns a promise object representing deleted user data or null if the user does not exist
 */
const deleteUser = async (userId: string): Promise<IUserData | null> => {
  const indexUser = db.findIndex((user) => user.id === userId);

  if (indexUser === -1) return null;

  const deletedUser = db.splice(indexUser, 1);

  return deletedUser[0];
};

export default { getAll, getUser, postUser, putUser, deleteUser };
