import fs from "fs";
import mongoose from "mongoose";
import { Users } from "../modules/comment.model.js";

export const getUsers = async (req, res) => {
  // const sendData = mongoose("src/db/users.json");
  const rawUSerdata =await Users.find()
  const users = rawUSerdata;
  res.send(users);
};
