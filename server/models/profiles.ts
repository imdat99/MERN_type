import mongoose, { Schema, Types } from "mongoose";

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