import { v4 as uuid } from 'uuid';
import { Column } from './column.model';

export interface IBoardData {
  id?: string;
  title: string;
  columns: Column[];
}

/** Board data models */
export class Board {
  public id: string;

  public title: string;

  public columns: Column[];

  /**
   * Constructor of class Board
   * @param boardData - board data }
   */
  constructor({ title = 'board title', columns = [] }: IBoardData) {
    this.id = uuid();
    this.title = title;
    this.columns = Column.createColumns(columns);
  }
}
