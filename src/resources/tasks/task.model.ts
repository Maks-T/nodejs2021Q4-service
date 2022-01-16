import { v4 as uuid } from 'uuid';

export interface ITaskData {
  title: string;
  order: number;
  description: string;
  userId: string | null;
  columnId: string;
}

/** Task data model */
export class Task {
  public id: string;

  public title: string;

  public order: number;

  public description: string;

  public userId: string | null;

  public columnId: string;

  /**
   * Constructor of class Task
   * @param userData - user data }
   */
  constructor({
    title = 'TASK TITLE',
    order = 0,
    description = 'task description',
    userId = null,
    columnId,
  }: ITaskData) {
    this.id = uuid();
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;

    this.columnId = columnId;
  }
}
