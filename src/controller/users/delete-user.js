import { Users } from "../modules/comment.model.js";

export const deleteUser = async (req, res) => {
  const { username } = req.body;

  try {
    const result = await Users.deleteMany({ username });

    if (result.deletedCount > 0) {
      return res.status(200).json({ success: true, message: "User(s) deleted successfully" });
    } else {
      return res.status(404).json({ success: false, message: "No matching user found" });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ success: false, message: "Error deleting user" });
  }
};
