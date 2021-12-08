import { v4 as uuid } from 'uuid';

export interface ITaskData {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string | null;
  boardId: string | null;
  columnId: string | null;
}
export class Task {
  public id: string;

  public title: string;

  public order: number;

  public description: string;

  public userId: string | null;

  public boardId: string | null;

  public columnId: string | null;

  constructor({
    title = 'TASK TITLE',
    order = 0,
    description = 'task description',
    userId = null,
    boardId = null,
    columnId = null,
  }: ITaskData) {
    this.id = uuid();
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}
