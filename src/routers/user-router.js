import express from "express";
import { createCatagories } from "../controller/users/create-catagories.js";
import { getUsers } from "../controller/users/get-users.js";
import { deleteUser } from "../controller/users/delete-user.js";
import { editUser } from "../controller/users/edit-user.js";
import { getCatagory } from "../controller/users/get-catagories.js";

export const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.get("/", getCatagory)
userRouter.post("/", createCatagories);
userRouter.delete("/", deleteUser);
userRouter.put("/",editUser)
