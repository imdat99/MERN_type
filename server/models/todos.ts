import mongoose, { Schema, Types } from "mongoose";

export interface todo {
    _id?: Types.ObjectId | any;
    id?: Types.ObjectId | any;
    title?: string | any;
    desc?: string | any;
    status?: string | any;
}

const todoSchema = new Schema({
    id: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    title: String,
    desc: String,
    status: {
        type: String,
        enum: ["READY", "PROCESSING", "SUSPEND", "COMPLETED"],
        default: "READY"
    }
},
    {
        timestamps: true
    }
)

export default mongoose.model('todos', todoSchema)