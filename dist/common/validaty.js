"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Returns true if id === uuid format else false
 * @param id - identifier in uuid format string
 * @returns true if id === uuid format else false
 */
const isIdValid = (id) => {
    const v4 = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89AB][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return id.match(v4);
};
exports.default = isIdValid;
//# sourceMappingURL=validaty.js.map