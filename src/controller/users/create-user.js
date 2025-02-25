import { UsersModel } from "../../modules/user-model.js";

export const createUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const users = new UsersModel({
      email: email,
      password: password,
    });
    res.send(users);
    users.save();
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ success: false, message: "Error creating user" });
  }
};
