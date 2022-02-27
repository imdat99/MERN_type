//Auth controller functions 
import { Response } from "express"
import argon2 from 'argon2'
import users, { user } from "../models/users";
import dbRefreshTokens, { RefreshTokens } from "../models/dbRefreshToken"
import profiles, { profile } from "../models/profile";
import generateTokens from "../middleware/generateTokens";
import { RequestCustom } from "../middleware/type";
import asyncWrapper from "../middleware/asyncWrapper";
import returnRes from "../middleware/returnRes";

export const authCtrl = {
    setAuth: asyncWrapper(async (req: RequestCustom, res: Response) => {
        // console.log(req)
        const user: user | null = await users.findById(req.uId).select('-password')
        if (!user) return returnRes.res400(res, "User not found")
        return returnRes.res200(res, user)
        // res.json({ success: true, user })
    }),

    register: asyncWrapper(async (req: RequestCustom, res: Response) => {
        const { email, username, password } = req.body;
        if (!email || !username || !password) return returnRes.res400(res, "Missing email, username or password")
        // check exitsting user
        const user: user | null = await users.findOne({ username });
        if (user) return returnRes.res400(res, "Username is Used")

        // All good
        // register new user
        const hashedPassword = await argon2.hash(password);
        const newUser = new users({ username, password: hashedPassword });
        await newUser.save();
        // create accesstoken and refreshtoken
        const token = generateTokens({ uId: newUser._id })

        // create new profile
        const newProfile = new profiles({
            id: newUser._id,
            fullName: null,
            phoneNumber: null,
            dob: null,
            email
        })
        await newProfile.save();
        // create new refreshtoken array
        const newRefreshToken = new dbRefreshTokens({
            id: newUser._id,
            refreshToken: [token.refreshToken]
        })
        await newRefreshToken.save()
        // return token
        returnRes.resCookie(res, token)

    }),

    login: asyncWrapper(async (req: RequestCustom, res: Response) => {
        const { username, password } = req.body
        const user: user | null = await users.findOne({ username })
        const Res = () => returnRes.res400(res, "Incorrect username or password")

        if (!user) return Res
        const passwordValid = await argon2.verify(user.password, password);

        if (!passwordValid) return Res
        const token = generateTokens({ uId: user._id })
        await dbRefreshTokens.findOneAndUpdate({ id: user._id }, { $push: { refreshToken: token.refreshToken } })

        returnRes.resCookie(res, token)
    }),

    reqRefreshtoken: asyncWrapper(async (req: RequestCustom, res: Response) => {

        const token = generateTokens({ uId: req.uId })
        await dbRefreshTokens.findOne({ id: req.uId }).then((rel: RefreshTokens) => {
            const hasRefreshToken: boolean = rel.refreshToken.includes(req.refreshToken as string)
            if (hasRefreshToken) {
                returnRes.resCookie(res, token)
            }
            else {
                returnRes.res401(res)
            }
        })
    })


}