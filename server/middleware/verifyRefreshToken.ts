import { Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken'
import returnRes from './returnRes';
import { RequestCustom } from './type';
import dbRefreshTokens, { RefreshTokens } from '../models/dbRefreshToken'


const verifyRefreshToken = async (req: RequestCustom, res: Response, next: NextFunction) => {

    const authHeader = req.header("authorization");
    const refreshToken = authHeader && authHeader.split(" ")[1];
    if (!refreshToken) return returnRes.res401(res)
    try {
        const payload = jwt.verify(refreshToken, process.env.REFRESHTOKEN_TOKEN_SECRET as Secret) as any
        req.uId = payload.uId
        req.refreshToken = refreshToken
        await dbRefreshTokens.findOne({ id: req.uId }).then((rel: RefreshTokens) => {
            // console.log(rel)

            const hasRefreshToken: boolean = rel?.refreshToken.includes(refreshToken as string) || false
            if (!hasRefreshToken) {
                returnRes.res401(res)
            } else {
                next();
            }
        })
    } catch (err) {
        console.log(err);
        return returnRes.res403(res)
    }
};

export default verifyRefreshToken
