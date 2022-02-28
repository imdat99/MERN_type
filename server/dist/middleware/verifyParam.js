"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const returnRes_1 = __importDefault(require("./returnRes"));
const verifyParams = (req, res, next) => {
    const re = /^[1-9]\d{0,2}$/g;
    const offset = req.query._offset;
    const limit = req.query._limit;
    if (offset || limit) {
        console.log("offset: ", offset);
        console.log("limit: ", limit);
    }
    if (!re.test(offset))
        return returnRes_1.default.res404(res);
    if (!re.test(limit))
        return returnRes_1.default.res404(res);
    try {
        req.limit = limit;
        req.offset = offset;
        next();
    }
    catch (err) {
        console.log(err);
        return returnRes_1.default.res403(res);
    }
};
exports.default = verifyParams;
