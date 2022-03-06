import { Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken'
import returnRes from './returnRes';
import { RequestCustom } from './type';


const verifytoken = (req: RequestCustom, res: Response, next: NextFunction) => {
    const authHeader = req.header("authorization");
    const token = authHeader && authHeader.split(" ")[1];
    // const refreshToken = req.cookies.MERN_refreshToken
    if (!token) return returnRes.res401(res)
    // if (!refreshToken) return returnRes.res401(res)
    try {
        const payload = jwt.verify(token, process.env.ACCESTOKEN_TOKEN_SECRET as Secret) as any
        // jwt.verify(refreshToken, process.env.REFRESHTOKEN_TOKEN_SECRET as Secret) as any
        req.uId = payload.uId
        // req.refreshToken = refreshToken

        next();
    } catch (err) {
        console.log(err);
        return returnRes.res403(res)
    }
};

export default verifytoken