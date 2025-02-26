import mongoose from "mongoose";
import { UsersModel } from "../../modules/users.model.js";

export const validateUserId = async (req, res, next) => {
  const { id } = req.body;

  try {
    if (!id) {
      res
        .status(303)
        .json({ success: false, message: "id not provided invalid input" });
    } else {
      const user = await UsersModel.findById(new mongoose.Types.ObjectId(id));

      if (!user) {
        res.status(404).json({ success: false, message: "Users not found" });
      } else {
        next();
      }
    }
  } catch (error) {
    res.status(500).json({ success: false, message: `error, ${error}` });
  }
};
