const uuid = require('uuid');

class Column {
  constructor({ id = uuid.v4(), title = 'TITLE COLUMN', order = 0 } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }

  static createColumns(columns) {
    return columns.map((column, index) => {
      const newColumn = column;

      newColumn.order = index + 1;

      return new Column(newColumn);
    });
  }
}

module.exports = Column;
