import { hash } from "bcrypt";
import { UsersModel } from "../../modules/users.model.js";

export const createUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = await hash(password, 10);
    console.log(hashedPassword);

    const user = new UsersModel({
      email: email,
      password: hashedPassword,
      role: "ADMIN"
    });

    await user.save(); 

    res
      .status(201)
      .json({ success: true, message: "User created successfully!" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ success: false, message: "Error creating user" });
  }
};
