import { hash } from "bcrypt";
import { UsersModel } from "../../modules/users.model.js";

export const createUser = async (req, res) => {
  try {
    const { email, password, phonenumber, address, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "Email, password, and role are required!",
      });
    }

    // Normalize email
    const normalizedEmail = email.toLowerCase();

    // Check if user already exists
    const existingUser = await UsersModel.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists!",
      });
    }

    // Hash password
    const hashedPassword = await hash(password, 10);

    // Create user
    const user = new UsersModel({
      email: normalizedEmail,
      password: hashedPassword,
      phonenumber,
      address,
      role,
    });

    await user.save();

    return res.status(201).json({
      success: true,
      message: "User created successfully!",
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({
      success: false,
      message: "Error creating user",
      error: error.message,
    });
  }
};
