"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const returnRes_1 = __importDefault(require("./returnRes"));
const verifyParams = (req, res, next) => {
    try {
        const re = /^\d+$/;
        const offset = req.query._offset;
        const limit = req.query._limit;
        if (offset && !re.test(offset))
            return returnRes_1.default.res404(res);
        if (limit && !re.test(limit))
            return returnRes_1.default.res404(res);
        req.limit = Number(limit) || 0;
        req.offset = Number(offset) || 0;
        next();
    }
    catch (err) {
        console.log(err);
        return returnRes_1.default.res403(res);
    }
};
exports.default = verifyParams;
