//Auth controller functions 
import { Response } from "express"
import { RequestCustom } from "../middleware/type";
import argon2 from 'argon2'
import users, { user } from "../models/users";
import dbRefreshTokens from "../models/dbRefreshToken"
import profiles from "../models/profiles";
import generateTokens, { tempToken, token } from "../middleware/generateTokens";
import asyncWrapper from "../middleware/asyncWrapper";
import returnRes from "../middleware/returnRes";
import sendMail from "../middleware/sendMail";

const authCtrl = {
    setAuth: asyncWrapper(async (req: RequestCustom, res: Response) => {
        const user: user | null = await users.findById(req.uId).select('-password')
        if (!user) return returnRes.res400(res, "User not found")
        return returnRes.res200(res, user)
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
            refreshToken: []
        })
        await newRefreshToken.save()
        // create accesstoken and refreshtoken
        const token = generateTokens({ uId: newUser._id })
        // return token
        returnRes.resToken(res, token)

    }),

    login: asyncWrapper(async (req: RequestCustom, res: Response) => {
        const { username, password } = req.body
        const user: user | null = await users.findOne({ username })

        if (!user) return returnRes.res400(res, "Incorrect username or password")
        const passwordValid = await argon2.verify(user.password, password);

        if (!passwordValid) return returnRes.res400(res, "Incorrect username or password")

        const token = generateTokens({ uId: user._id })

        returnRes.resToken(res, token)
    }),

    changePass: asyncWrapper(async (req: RequestCustom, res: Response) => {
        const { oldpass, password } = req.body
        const user: user | null = await users.findById({ _id: req.uId })

        if (!user) return returnRes.res400(res, "User not found")
        const passwordValid = await argon2.verify(user.password, oldpass);
        if (!passwordValid) return returnRes.res400(res, "Incorrect password")

        const hashedPassword = await argon2.hash(password);
        let updatedpass = { password: hashedPassword }
        updatedpass = await users.findByIdAndUpdate({ _id: req.uId }, updatedpass, { new: true }) as typeof updatedpass

        returnRes.res200(res)
    }),

    reqRefreshtoken: asyncWrapper(async (req: RequestCustom, res: Response) => {
        await dbRefreshTokens.findOneAndUpdate({ id: req.uId }, { $pull: { refreshToken: { $in: [req.refreshToken] } } })
        const token = generateTokens({ uId: req.uId })
        returnRes.resToken(res, token)
    }),

    logout: asyncWrapper(async (req: RequestCustom, res: Response) => {
        await dbRefreshTokens.findOneAndUpdate({ id: req.uId }, { $pull: { refreshToken: { $in: [req.refreshToken] } } })
        const token: token = {
            accessToken: '',
            refreshToken: ''
        }
        returnRes.resToken(res, token)
    }),

    resetPass: asyncWrapper(async (req: RequestCustom, res: Response) => {
        const { password } = req.body
        console.log(password)
        const hashedPassword = await argon2.hash(password);
        let updatedpass = { password: hashedPassword }
        updatedpass = await users.findByIdAndUpdate({ _id: req.uId }, updatedpass, { new: true }) as typeof updatedpass

        returnRes.res200(res)
    }),

    forgot: asyncWrapper(async (req: RequestCustom, res: Response) => {
        const { username } = req.body
        const user = await users.findOne({ username });
        if (!user) return returnRes.res400(res, 'User not found')
        const profile = await profiles.findOne({ id: user._id })
        await sendMail(profile.email, tempToken({ uId: user._id }), res)
    }),
}

export default authCtrl