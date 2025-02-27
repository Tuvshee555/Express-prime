import { CategoriesModel } from "../../modules/categories.model.js";

export const deleteCatagories = async (req, res) => {
  const { _id } = req.body;

  try {
    await CategoriesModel.findByIdAndDelete(_id);

    res
      .status(200)
      .json({ success: true, message: "Succesfully deleted user" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting user" });
  }
};
