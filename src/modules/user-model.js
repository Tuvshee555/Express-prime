import mongoose, { mongo } from "mongoose";

const usersSchema = new mongoose.Schema({
    email: { type: String, require: true},
    password: {type: Number, require: true},
    phonenumber: {type: Number},
    address: {type: String},
    orderedFoods: [
        {
            name: String,
            type: {
                type: {type: String}
            }
        }
    ],
    isVerified: {type: Boolean, default: false},
    createdAt: {type: Date, default: Date.now},
    updateAt: {type: Date}
})

export const UsersModel =   mongoose.model("users", usersSchema)
