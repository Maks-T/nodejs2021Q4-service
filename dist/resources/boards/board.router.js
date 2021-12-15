"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const board_controller_1 = __importDefault(require("./board.controller"));
const boardRouter = (0, express_1.Router)();
boardRouter.get('/boards/', board_controller_1.default.getAll);
boardRouter.get('/boards/:boardId/', board_controller_1.default.getBoard);
boardRouter.post('/boards/', board_controller_1.default.postBoard);
boardRouter.put('/boards/:boardId/', board_controller_1.default.putBoard);
boardRouter.delete('/boards/:boardId/', board_controller_1.default.deleteBoard);
exports.default = boardRouter;
//# sourceMappingURL=board.router.js.map