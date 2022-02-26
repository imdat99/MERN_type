"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const returnRes = {
    res400: (res, msg) => res.status(400).json({ success: false, msg }),
    res401: (res) => res.status(401).json({ success: false, msg: "Access token not found" }),
    res403: (res) => res.status(403).json({ success: false, msg: "Invalid token" }),
    res500: (res) => res.status(500).json({ success: false, msg: "Internal server error" }),
    res200: (res, data, msg) => res.status(200).json({ success: true, msg, data }),
    resCookie: (res, token, msg) => {
        res.cookie("MERN_refreshToken", token.refreshToken, {
            httpOnly: true,
            sameSite: "strict",
            secure: false,
            path: '/'
        });
        res.status(200).json({
            success: true,
            msg,
            token: token.accessToken
        });
    }
};
exports.default = returnRes;
