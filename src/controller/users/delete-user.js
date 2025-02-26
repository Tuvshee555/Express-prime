import { UsersModel } from "../../modules/users.model.js";


export const deleteUser = async (req, res) => {
  const { id } = req.body;

  try {
    await UsersModel.findByIdAndDelete(id);

    res
      .status(200)
      .json({ success: true, message: "Succesfully deleted user" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error deleting user" });
  }
};

