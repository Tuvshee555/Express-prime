import { Catagory } from "../modules/catagory.model.js";

export const createCatagories = async (req, res) => {
  const { username } = req.body;
  try {
    const users = new Catagory({
      username: username,
    });
    users.save();
    const rawUSerdata = await Catagory.find();

    res.send(rawUSerdata);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ success: false, message: "Error creating user" });
  }
};
