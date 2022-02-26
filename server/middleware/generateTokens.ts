import jwt, { Secret } from "jsonwebtoken"
type payload = string | object | Buffer
export interface token {
    accessToken: string
    refreshToken: string
}
const generateTokens = (payload: payload) => {
    const accessToken = jwt.sign(payload, process.env.ACCESTOKEN_TOKEN_SECRET as Secret, {
        expiresIn: '20m'
    })

    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET as Secret, {
        expiresIn: '1h'
    })
    return {
        accessToken,
        refreshToken
    }
}

export default generateTokens