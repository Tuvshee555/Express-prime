import { UsersModel } from "../../modules/users.model.js";

export const getUsers = async (req, res) => {
  try {
    const users = await UsersModel.find();

    res.status(200).send(users);
  } catch (err) {
    res.status(500).send(`Error while getting users ${err}`);
  }
};
