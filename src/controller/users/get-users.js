import { Users } from "../modules/comment.model.js";

export const getUsers = async (req, res) => {
  const rawUSerdata =await Users.find()
  const users = rawUSerdata;
  res.send(users);
};
