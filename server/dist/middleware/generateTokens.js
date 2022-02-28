"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dbRefreshToken_1 = __importDefault(require("../models/dbRefreshToken"));
const generateTokens = (payload) => {
    const accessToken = jsonwebtoken_1.default.sign(payload, process.env.ACCESTOKEN_TOKEN_SECRET, {
        expiresIn: '20m'
    });
    const refreshToken = jsonwebtoken_1.default.sign(payload, process.env.REFRESHTOKEN_TOKEN_SECRET, {
        expiresIn: '1h'
    });
    // console.log(payload.id)
    Promise.resolve(dbRefreshToken_1.default.findOneAndUpdate({ id: payload.uId }, { $push: { refreshToken } }));
    return {
        accessToken,
        refreshToken
    };
};
exports.default = generateTokens;
