"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const returnRes_1 = __importDefault(require("./returnRes"));
const verifytoken = (req, res, next) => {
    const authHeader = req.header("authorization");
    const token = authHeader && authHeader.split(" ")[1];
    // const refreshToken = req.cookies.MERN_refreshToken
    if (!token)
        return returnRes_1.default.res401(res);
    // if (!refreshToken) return returnRes.res401(res)
    try {
        const payload = jsonwebtoken_1.default.verify(token, process.env.ACCESTOKEN_TOKEN_SECRET);
        // jwt.verify(refreshToken, process.env.REFRESHTOKEN_TOKEN_SECRET as Secret) as any
        req.uId = payload.uId;
        // req.refreshToken = refreshToken
        next();
    }
    catch (err) {
        console.log(err);
        return returnRes_1.default.res403(res);
    }
};
exports.default = verifytoken;
