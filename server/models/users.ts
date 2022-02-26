import mongoose, { Schema, Types } from "mongoose";

export interface user {
    _id?: Types.ObjectId;
    username: string;
    password: string;
}


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
},
    {
        timestamps: true
    }
)

export default mongoose.model('users', userSchema)