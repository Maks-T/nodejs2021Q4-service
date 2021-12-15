"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./common/config");
const app_1 = __importDefault(require("./app"));
/* eslint-disable no-console */
app_1.default.listen(config_1.config.PORT, () => console.log(`Server started`));
//# sourceMappingURL=server.js.map