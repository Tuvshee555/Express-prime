import jwt from "jsonwebtoken";
import { sendEmail } from "../../utils/send-email.js";
import { UsersModel } from "../../modules/users.model.js";

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    console.log("Forgot password request for:", email);

    const user = await UsersModel.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    console.log("User found:", user.email);

    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
    console.log("Reset link:", resetLink);

    await sendEmail(user.email, "Password Reset", `Click here: ${resetLink}`);

    res.json({ message: "Password reset email sent" });
  } catch (err) {
    console.error("Forgot password error:", err);
    res.status(500).json({ message: err.message });
  }
};

