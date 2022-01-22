import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';
export interface IUserData {
  id?: string;
  name: string;
  login: string;
  password?: string;
}

/** User data model */
export class User {
  public id;

  public name;

  public login;

  public password;

  /**
   * Constructor of class User
   * @param userData - user data }
   */
  constructor({
    id,
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd',
  }: IUserData) {
    this.id = id || uuid();
    this.name = name;
    this.login = login;
    this.password = bcrypt.hashSync(password, bcrypt.genSaltSync());
  }

  /**
   * Returns user data data without password
   * @param user - user data
   * @returns user data data without password
   */
  static toResponse(user: IUserData): IUserData {
    const { id, name, login } = user;
    return { id, name, login };
  }
}
