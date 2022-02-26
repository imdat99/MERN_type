import { Response } from "express"
import { RequestCustom } from "./type";
import returnRes from "./returnRes";

const asyncWrapper = (fn: any) => (req: RequestCustom, res: Response) => {
    Promise.resolve(fn(req, res)).catch((err) => {
        console.log(err);
        return returnRes.res500(res)
    });
}

export default asyncWrapper