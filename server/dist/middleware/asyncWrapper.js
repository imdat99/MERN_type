"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const returnRes_1 = __importDefault(require("./returnRes"));
const asyncWrapper = (fn) => (req, res) => {
    Promise.resolve(fn(req, res)).catch((err) => {
        console.log(err);
        return returnRes_1.default.res500(res);
    });
};
exports.default = asyncWrapper;
