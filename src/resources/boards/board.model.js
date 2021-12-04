const uuid = require('uuid');
const Column = require('./column.model');

class Board {
  constructor({
    id = uuid.v4(),
    title = 'TITLE BOARD',
    columns = [
      {
        title: 'first column',
      },
      {
        title: 'second column',
      },
      {
        title: 'third column',
      },
    ],
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = Column.createColumns(columns);
  }

  get data() {
    return {
      id: this.id,
      title: this.title,
      columns: this.columns,
    };
  }
}

module.exports = Board;
