"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Column = void 0;
const uuid_1 = require("uuid");
/** Column data models */
class Column {
    /**
     * Constructor of class Board
     * @param boardData - board data }
     */
    constructor({ id = (0, uuid_1.v4)(), title = 'COLUMN TITLE', order = 0 }) {
        this.id = id;
        this.title = title;
        this.order = order;
    }
    /**
     * Returns an transformed array of column data
     * @param columns - array of column data
     * @returns array of column data
     */
    static createColumns(columns) {
        return columns.map((column, index) => {
            const newColumn = column;
            newColumn.order = index + 1;
            return new Column(newColumn);
        });
    }
}
exports.Column = Column;
//# sourceMappingURL=column.model.js.map