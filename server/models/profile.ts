import mongoose, { Schema, Types } from "mongoose";

export interface profile {
    _id?: Types.ObjectId;
    id: Types.ObjectId;
    fullName: string;
    phoneNumber: string;
    dob: string;
    email: string;
}

const profileSchema = new Schema({
    id: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    fullName: String,
    phoneNumber: String,
    dob: String,
    email: {
        type: String,
        required: true
    },
},
    {
        timestamps: true
    }
)

export default mongoose.model('profiles', profileSchema)