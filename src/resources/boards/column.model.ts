import { v4 as uuid } from 'uuid';

interface IColumnData {
  id?: string;
  title: string;
  order: number;
}

/** Column data models */
export class Column {
  public id: string;

  public title: string;

  public order: number;

  /**
   * Constructor of class Board
   * @param boardData - board data }
   */
  constructor({ id = uuid(), title = 'COLUMN TITLE', order = 0 }: IColumnData) {
    this.id = id;
    this.title = title;
    this.order = order;
  }

  /**
   * Returns an transformed array of column data
   * @param columns - array of column data
   * @returns array of column object
   */
  static createColumns(columns: IColumnData[]): Column[] {
    return columns.map((column, index) => {
      const newColumn = column;

      newColumn.order = index + 1;

      return new Column(newColumn);
    });
  }
}
