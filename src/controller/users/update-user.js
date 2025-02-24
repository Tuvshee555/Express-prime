import { UsersModel } from "../../modules/user-model.js";

export const updateUser = async (req, res) => {
  const { id } = req.body;
  try {
    const updatedUser = await UsersModel.findByIdAndUpdate(
      { _id: id },
      { name: "ee" }
    );
    res.statusCode(202).send(updatedUser);
  } catch (error) {
    res.status(500).send("Error while updating user", error);
  }
};
