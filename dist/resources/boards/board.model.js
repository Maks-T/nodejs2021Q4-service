"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Board = void 0;
const uuid_1 = require("uuid");
const column_model_1 = require("./column.model");
/** Board data model */
class Board {
    /**
     * Constructor of class Board
     * @param boardData - board data }
     */
    constructor({ title = 'board title', columns = [] }) {
        this.id = (0, uuid_1.v4)();
        this.title = title;
        this.columns = column_model_1.Column.createColumns(columns);
    }
}
exports.Board = Board;
//# sourceMappingURL=board.model.js.map