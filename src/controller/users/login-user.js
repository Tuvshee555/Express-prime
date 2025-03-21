import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UsersModel } from "../../modules/users.model.js";

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required!",
    });
  }

  try {
    const user = await UsersModel.findOne({ email });

    if (!user || !user.password) {
      return res.status(400).json({
        success: false,
        message: "This account does not exist!",
      });
    }

    console.log("Stored Hashed Password:", user.password);

    const passwordMatches = await bcrypt.compare(password, user.password);
    console.log("Password Match:", passwordMatches);

    if (!passwordMatches) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password!",
      });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        success: false,
        message: "Please verify your email before logging in.",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      "your_secret_key",
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      success: true,
      message: "Logged in successfully!",
      user: {
        email: user.email,
        role: user.role,
      },
      token,
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
