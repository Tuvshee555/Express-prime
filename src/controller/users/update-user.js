import { UsersModel } from "../../modules/users.model.js";

export const updateUser = async (req, res) => {
  const userData = req.body;
  const {id} = req.params

  try {
    const updatedUser = await UsersModel.findByIdAndUpdate(
      id,
      userData,
      { new: true } 
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found!" });
    }

    res.status(202).json({ success: true, user: updatedUser });

  } catch (error) {
    res.status(500).json({ success: false, message: `Error while updating user: ${error.message}` });
  }
};
