import { UsersModel } from "../../modules/users.model.js";

export const updateUser = async (req, res) => {
  const { _id, email, password, phonenumber, address, role } = req.body;

  if (!_id) {
    return res.status(400).json({ success: false, message: "User ID is required!" });
  }

  try {
    const updatedUser = await UsersModel.findByIdAndUpdate(
      _id, 
      {
        email,
        password,
        phonenumber,
        address,
        role,
      },
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
