import jwt, { Secret } from "jsonwebtoken"
import { Types } from "mongoose";
import dbRefreshTokens from "../models/dbRefreshToken"

export type payload = string | object | Buffer | Types.ObjectId | any

export interface token {
    accessToken: string
    refreshToken: string
}

const generateTokens = (payload: payload) => {
    const accessToken = jwt.sign(payload, process.env.ACCESTOKEN_TOKEN_SECRET as Secret, {
        expiresIn: '20m'
    })

    const refreshToken = jwt.sign(payload, process.env.REFRESHTOKEN_TOKEN_SECRET as Secret, {
        // expiresIn: '1d'
    })
    // console.log(payload.id)
    Promise.resolve(dbRefreshTokens.findOneAndUpdate({ id: payload.uId }, { $push: { refreshToken } }))

    return {
        accessToken,
        refreshToken
    }
}

export default generateTokens

export const tempToken = (payload: payload): string => {
    const Token = jwt.sign(payload, process.env.ACCESTOKEN_TOKEN_SECRET as Secret, {
        expiresIn: '15m'
    })
    return Token
}