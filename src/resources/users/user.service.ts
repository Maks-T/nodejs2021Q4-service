import { IUserData } from './user.model';
import { userRepo } from './user.repository';
import { UserEntity } from './user.entity';

/**
 * Returns data of all users from the repository
 * @returns a promise object representing an array of UserEntity
 */
const getAll = async (): Promise<UserEntity[]> => userRepo().find();

/**
 * Returns user data from the repository
 * @param userId - identifier of user
 * @returns a promise object representing UserEntity or undefined if the user is not found
 */
const getUser = async (userId: string): Promise<UserEntity | undefined> => {
  const findedUser = await userRepo().findOne(userId);
  return findedUser;
};

/**
 * Save and return created user data from the repository
 * @param userData - data user
 * @returns a promise object representing created UserEntity
 */
const postUser = async (userData: IUserData): Promise<UserEntity> => {
  const createdUser = userRepo().create(userData);
  await userRepo().save(createdUser);
  return createdUser;
};

/**
 * Update and return updated user data from the repository
 * @param userId - identifier of user
 * @param userData - data user
 * @returns a promise object representing updated UserEntity or undefined if the user does not exist
 */
const putUser = async (
  userId: string,
  userData: IUserData
): Promise<UserEntity | undefined> => {
  const updatedUser = await userRepo().findOne(userId);
  if (updatedUser) {
    Object.assign(updatedUser, userData);
    await userRepo().save(updatedUser);
  }
  return updatedUser;
};

/**
 * Delete and return deleted user data from the repository
 * @param userId - identifier of user
 * @returns a promise object representing true if user successly deleted or false if user not found
 */
const deleteUser = async (userId: string): Promise<boolean> => {
  const result = await userRepo().delete(userId);
  console.log('result.affected   ', result.affected);
  if (result.affected === 0) {
    return false;
  }
  return true;
};
export default { getAll, getUser, postUser, putUser, deleteUser };
