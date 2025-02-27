import { CategoriesModel } from "../../modules/categories.model.js";

export const createCatagories = async (req, res) => {
  const { categoryName } = req.body;
  try {
    const Categorys = new CategoriesModel({
      categoryName: categoryName,
    });
    Categorys.save();
    const rawCategorydata = await CategoriesModel.find();

    res.status(200).send(rawCategorydata);
  } catch (error) {
    console.error("Error creating Category:", error);
    res.status(500).json({ success: false, message: "Error creating Category" });
  }
};
