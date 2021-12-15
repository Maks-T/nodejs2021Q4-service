"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const uuid_1 = require("uuid");
/** User data model */
class User {
    /**
     * Constructor of class User
     * @param userData - user data }
     */
    constructor({ name = 'USER', login = 'user', password = 'P@55w0rd', }) {
        this.id = (0, uuid_1.v4)();
        this.name = name;
        this.login = login;
        this.password = password;
    }
    /**
     * Returns object user data without password
     * @param user - user data
     * @returns object user data without password
     */
    static toResponse(user) {
        const { id, name, login } = user;
        return { id, name, login };
    }
}
exports.User = User;
//# sourceMappingURL=user.model.js.map