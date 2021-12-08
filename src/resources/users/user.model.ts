import { v4 as uuid } from 'uuid';

export interface IUserData {
  id?: string;
  name: string;
  login: string;
  password?: string;
}

export class User {
  public id;

  public name;

  public login;

  public password;

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

  static toResponse(user: IUserData): IUserData {
    const { id, name, login } = user;
    return { id, name, login };
  }
}
