import mongoose, { Schema, Types } from "mongoose";

export interface todoStatus {
    _id?: Types.ObjectId;
    id: Types.ObjectId;
    title: string;
    desc: string;
}

const todoStatusSchema = new Schema({
    id: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    title: String,
    desc: String,
},
    {
        timestamps: true
    }
)

export default mongoose.model('todoStatus', todoStatusSchema)