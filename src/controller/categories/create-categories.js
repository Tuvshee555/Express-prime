import { CategoriesModel } from "../../modules/categories.model.js";

export const createCategories = async (req, res) => {
  const { categoryName } = req.body;

  if (!categoryName || !categoryName.trim()) {
    return res
      .status(400)
      .json({ success: false, message: "Category name is empty!" });
  }

  try {
    const category = new CategoriesModel({ categoryName });

    await category.save();

    const rawCategoryData = await CategoriesModel.find();
    res.status(200).json(rawCategoryData);
  } catch (error) {
    console.error("Error creating category:", error);
    res
      .status(500)
      .json({ success: false, message: "Error creating category" });
  }
};
