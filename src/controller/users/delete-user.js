import { UsersModel } from "../../modules/users.model.js";


export const deleteUser = async (req, res) => {
  const { _id } = req.body;

  try {
    await UsersModel.findByIdAndDelete(_id);

    res
      .status(200)
      .json({ success: true, message: "Succesfully deleted user" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error deleting user" });
  }
};

