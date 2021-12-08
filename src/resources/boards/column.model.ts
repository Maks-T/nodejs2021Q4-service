import { v4 as uuid } from 'uuid';

interface IColumnData {
  id?: string;
  title: string;
  order: number;
}

export class Column {
  public id: string;

  public title: string;

  public order: number;

  constructor({ id = uuid(), title = 'COLUMN TITLE', order = 0 }: IColumnData) {
    this.id = id;
    this.title = title;
    this.order = order;
  }

  static createColumns(columns: IColumnData[]): Column[] {
    return columns.map((column, index) => {
      const newColumn = column;

      newColumn.order = index + 1;

      return new Column(newColumn);
    });
  }
}
