import { Response } from "express";
import { token } from "./generateTokens";
const returnRes = {
    res400: (res: Response, msg: string) => res.status(400).json({ success: false, msg }),

    res401: (res: Response) => res.status(401).json({ success: false, msg: "Access token not found" }),

    res403: (res: Response) => res.status(403).json({ success: false, msg: "Invalid token" }),

    res500: (res: Response) => res.status(500).json({ success: false, msg: "Internal server error" }),

    res200: (res: Response, data?: any, msg?: string,) => res.status(200).json({ success: true, msg, data }),

    resCookie: (res: Response, token: token, msg?: string) => {
        res.cookie("MERN_refreshToken", token.refreshToken, {
            httpOnly: true,
            sameSite: "strict",
            secure: false,
            path: '/'
        })
        res.status(200).json({
            success: true,
            msg,
            token: token.accessToken
        })
    }
}
export default returnRes