import fs from "fs";
import bcrypt from "bcrypt";

export const loginUser = async (req, res) => {
  const rawUserData = fs.readFileSync("src/db/users.json");
  const users = JSON.parse(rawUserData);

  const { username, password } = req.body;

  const user = users.find((user) => user.username === username);

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "This account does not exist!! ",
    });
  }

  const passwordMatches = await bcrypt.compare(password, user.password);

  if (!passwordMatches) {
    return res.status(400).json({
      success: false,
      message: "Incorrect password!",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Loged in succesfully!",
    user: {
      firstName: user.firstName,
      lastName: user.lastName,
      age: user.age,
      username: user.username,
    },
  });
};