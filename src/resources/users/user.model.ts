import { v4 as uuid } from 'uuid';

export interface IUserData {
  id?: string;
  name: string;
  login: string;
  password?: string;
}

/** User data models */
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
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd',
  }: IUserData) {
    this.id = uuid();
    this.name = name;
    this.login = login;
    this.password = password;
  }

  /**
   * Returns object user data without password
   * @param user - user data
   * @returns object user data without password
   */
  static toResponse(user: IUserData): IUserData {
    const { id, name, login } = user;
    return { id, name, login };
  }
}
