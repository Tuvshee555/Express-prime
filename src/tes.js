import bcrypt from "bcrypt";
import { Users } from "../modules/comment.model.js";
import fs from "fs";

export const createUser = async (req, res) => {
  try {
    const rawUserdata = fs.readFileSync("src/db/users.json", "utf-8");
    const users = JSON.parse(rawUserdata);

    const { firstName, lastName, username, password, age } = req.body;

    if (!firstName || !lastName || !username || !password || !age) {
      return res.status(400).json({ success: false, message: "All fields are required!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Users({
      firstName,
      lastName,
      username,
      password: hashedPassword,
      age,
    });

    await newUser.save(); 

    const userToSave = { firstName, lastName, username, age };

    users.push(userToSave);
    fs.writeFileSync("src/db/users.json", JSON.stringify(users, null, 2));

    return res.status(201).json({
      success: true,
      message: "User created successfully!",
      user: userToSave,
    });

  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ success: false, message: "Error creating user" });
  }
};
