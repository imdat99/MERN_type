import { Response, NextFunction } from 'express';
import returnRes from './returnRes';
import { RequestCustom } from './type';


const verifyParams = (req: RequestCustom, res: Response, next: NextFunction) => {
    try {
        const re = /^\d+$/
        const offset = req.query._offset
        const limit = req.query._limit
        if (offset && !re.test(offset as string)) return returnRes.res404(res)
        if (limit && !re.test(limit as string)) return returnRes.res404(res)
        req.limit = Number(limit) || 0
        req.offset = Number(offset) || 0

        next();
    } catch (err) {
        console.log(err);
        return returnRes.res403(res)
    }
};

export default verifyParams