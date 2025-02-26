import { compare } from "bcrypt";
import { UsersModel } from "../../modules/users.model.js";

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UsersModel.findOne({ email });

    if (!user || !user.password) {
      return res.status(400).json({
        success: false,
        message: "This account does not exist!",
      });
    }

    const passwordMatches = await compare(password, user.password);
    if (!passwordMatches) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password!",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Logged in successfully!",
      user: {
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
