import { Response } from "express";
import { token } from "./generateTokens";
const returnRes = {
    res400: (res: Response, msg: string) => res.status(400).json({ success: false, msg }),

    res401: (res: Response) => res.status(401).json({ success: false, msg: "Access token not found" }),

    res403: (res: Response) => res.status(403).json({ success: false, msg: "Invalid token" }),

    res404: (res: Response) => res.status(404).json({ success: false, msg: "Not found" }),

    res500: (res: Response) => res.status(500).json({ success: false, msg: "Internal server error" }),

    res200: (res: Response, results?: any, msg?: string) => res.status(200).json({ success: true, ...results, msg }),

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
            accesstoken: token.accessToken
        })
    }
}
export default returnRes