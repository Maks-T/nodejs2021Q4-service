"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const task_controller_1 = __importDefault(require("./task.controller"));
const taskRouter = (0, express_1.Router)();
taskRouter.get('/boards/:boardId/tasks/', task_controller_1.default.getAll);
taskRouter.get('/boards/:boardId/tasks/:taskId/', task_controller_1.default.getTask);
taskRouter.post('/boards/:boardId/tasks/', task_controller_1.default.postTask);
taskRouter.put('/boards/:boardId/tasks/:taskId/', task_controller_1.default.putTask);
taskRouter.delete('/boards/:boardId/tasks/:taskId/', task_controller_1.default.deleteTask);
exports.default = taskRouter;
//# sourceMappingURL=task.router.js.map