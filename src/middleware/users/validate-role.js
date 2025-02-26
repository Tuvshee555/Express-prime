import { UsersModel } from "../../modules/users.model.js";

export const validateRole = async (req, res, next) => {
  const { email } = req.body; 

  try {
    const user = await UsersModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found!" });
    }

    if (user.role === "USER") {
      console.log("USER");
    } else {
      console.log("ADMIN");
    }

    next();
  } catch (error) {
    console.error("Error in validateRole:", error);
    res.status(500).json({ success: false, message: `Server error: ${error.message}` });
  }
};
