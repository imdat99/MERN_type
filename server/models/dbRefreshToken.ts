import mongoose, { Schema, Types } from "mongoose";

export interface RefreshTokens {
    id: Types.ObjectId;
    refreshToken: string[]
}

const dbRefreshTokenSchema = new Schema({
    id: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    refreshToken: [String]
})

export default mongoose.model('dbRefreshTokens', dbRefreshTokenSchema)