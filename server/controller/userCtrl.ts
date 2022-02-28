import { Response } from "express";
import asyncWrapper from "../middleware/asyncWrapper";
import returnRes from "../middleware/returnRes";
import { RequestCustom } from "../middleware/type";
import dbRefreshToken from "../models/dbRefreshToken";
import profile from "../models/profile";
import todos from "../models/todos";
import users from "../models/users";

const userCtrl = {
    getInfo: asyncWrapper(async (req: RequestCustom, res: Response) => {
        const results = await profile.findOne({ id: req.uId })
        returnRes.res200(res, { results })
    }),

    updateInfo: asyncWrapper(async (req: RequestCustom, res: Response) => {
        const { fullName, phoneNumber, dob, email } = req.body
        const results = await profile.findOneAndUpdate(
            { id: req.uId },
            { fullName, phoneNumber, dob, email },
            { new: true }
        )
        returnRes.res200(res, { results })
    }),

    deleteUser: asyncWrapper(async (req: RequestCustom, res: Response) => {
        await users.findByIdAndRemove({ _id: req.uId })
        await profile.findOneAndRemove({ id: req.uId })
        await dbRefreshToken.findOneAndRemove({ id: req.uId })
        await todos.deleteMany({ id: req.uId })
        returnRes.res200(res)
    })
}

export default userCtrl