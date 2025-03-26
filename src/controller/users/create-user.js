import { hash } from "bcrypt";
import { UsersModel } from "../../modules/users.model.js";

export const createUser = async (req, res) => {
  const { email, password, phonenumber, address, role } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required!",
    });
  }

  try {
    const existingUser = await UsersModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists!",
      });
    }

    const hashedPassword = await hash(password, 10);
    console.log("hashed password:", hashedPassword);

    const user = new UsersModel({
      email,
      password: hashedPassword,
      phonenumber,
      address,
      role,
    });

    const newUser = await user.save();

    return res.status(201).json({
      success: true,
      message: "User created successfully!",
      newUser, 
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
