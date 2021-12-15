"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const uuid_1 = require("uuid");
/** Task data model */
class Task {
    /**
     * Constructor of class Task
     * @param userData - user data }
     */
    constructor({ title = 'TASK TITLE', order = 0, description = 'task description', userId = null, boardId = null, columnId = null, }) {
        this.id = (0, uuid_1.v4)();
        this.title = title;
        this.order = order;
        this.description = description;
        this.userId = userId;
        this.boardId = boardId;
        this.columnId = columnId;
    }
}
exports.Task = Task;
//# sourceMappingURL=task.model.js.map