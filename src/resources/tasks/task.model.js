const uuid = require('uuid');

class Task {
  constructor({
    id = uuid.v4(),
    title = 'TITLE TASK',
    order = 0,
    description = 'Description task',
    userId = null,
    boardId = null,
    columnId = null,
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  get data() {
    return {
      id: this.id,
      title: this.title,
      order: this.order,
      description: this.description,
      userId: this.userId,
      boardId: this.boardId,
      columnId: this.columnId,
    };
  }
}
module.exports = Task;
