import { Users } from "../modules/comment.model.js";

export const createUser = async (req, res) => {
  const { username, password, firstName, lastName, age } = req.body;
  try {
    const users = new Users({
      username: username,
      password: password,
      firstName: firstName,
      lastName: lastName,
      age: age,
    });
    res.send(users);
    users.save();
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ success: false, message: "Error creating user" });
  }
};
