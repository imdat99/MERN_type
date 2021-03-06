"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const returnRes = {
    // MERN_refreshToken
    res400: (res, msg) => res.status(400).json({ success: false, msg }),
    res401: (res) => res.status(401).json({ success: false, msg: "Access token not found" }),
    res403: (res) => res.status(403).json({ success: false, msg: "Invalid token" }),
    res404: (res) => res.status(404).json({ success: false, msg: "Not found" }),
    res500: (res) => res.status(500).json({ success: false, msg: "Internal server error" }),
    res200: (res, results, msg) => res.status(200).json(Object.assign(Object.assign({ success: true }, results), { msg })),
    resToken: (res, token, results, msg) => {
        res.status(200).json({
            success: true,
            results,
            msg,
            accesstoken: token.accessToken,
            refreshToken: token.refreshToken
        });
    }
};
exports.default = returnRes;
