"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("./user.controller"));
const userRouter = (0, express_1.Router)();
userRouter.get('/users/', user_controller_1.default.getAll);
userRouter.get('/users/:userId/', user_controller_1.default.getUser);
userRouter.post('/users/', user_controller_1.default.postUser);
userRouter.put('/users/:userId/', user_controller_1.default.putUser);
userRouter.delete('/users/:userId/', user_controller_1.default.deleteUser);
exports.default = userRouter;
//# sourceMappingURL=user.router.js.map