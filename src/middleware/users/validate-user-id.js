import { UsersModel } from "../../modules/users.model.js";

export const validateUserId = async (req, res, next) => {
  const { _id } = req.body;

  try {
    if (!_id) {
      return res.status(400).json({ success: false, message: "id not provided, invalid input" });
    }

    const user = await UsersModel.findById(_id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return next();
  } catch (error) {
    return res.status(500).json({ success: false, message: `Error: ${error.message}` });
  }
};
