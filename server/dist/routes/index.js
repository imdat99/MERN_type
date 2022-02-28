"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authRoute_1 = __importDefault(require("./authRoute"));
const todoRoute_1 = __importDefault(require("./todoRoute"));
const userRoute_1 = __importDefault(require("./userRoute"));
const routes = {
    authRouter: authRoute_1.default,
    todoRouter: todoRoute_1.default,
    userRouter: userRoute_1.default
};
exports.default = routes;
