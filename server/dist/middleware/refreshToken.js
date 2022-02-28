"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const returnRes_1 = __importDefault(require("./returnRes"));
const dbRefreshToken_1 = __importDefault(require("../models/dbRefreshToken"));
const verfyCookie = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.cookies.MERN_refreshToken;
    if (!refreshToken)
        return returnRes_1.default.res401(res);
    try {
        const payload = jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESHTOKEN_TOKEN_SECRET);
        req.uId = payload.uId;
        req.refreshToken = refreshToken;
        yield dbRefreshToken_1.default.findOne({ id: req.uId }).then((rel) => {
            const hasRefreshToken = rel.refreshToken.includes(refreshToken);
            if (!hasRefreshToken) {
                return returnRes_1.default.res401(res);
            }
        });
        next();
    }
    catch (err) {
        console.log(err);
        return returnRes_1.default.res403(res);
    }
});
exports.default = verfyCookie;
