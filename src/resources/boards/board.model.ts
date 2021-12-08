import { v4 as uuid } from 'uuid';
import { Column } from './column.model';

export interface IBoardData {
  id?: string;
  title: string;
  columns: Column[];
}

export class Board {
  public id: string;

  public title: string;

  public columns: Column[];

  constructor({ title = 'board title', columns = [] }: IBoardData) {
    this.id = uuid();
    this.title = title;
    this.columns = Column.createColumns(columns);
  }
}
