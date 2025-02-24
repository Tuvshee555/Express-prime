import mongoose from "mongoose";

//schema ===> modela
//collection ===> table
//cluster fotor => database => collection

const usersSchema = new mongoose.Schema({
    username: {type: String, require: true},
    password: {type: Number, require: true},
    firstName: {type: String, require: true},
    lastName: {type: String, require: true},
    age: {type: String, require: true},
})

export const Users = mongoose.model("users", usersSchema)
