import { CategoriesModel } from "../../modules/categories.model.js";

export const validateCategoriesId = async (req, res, next) => {
  const { _id } = req.body;

  try {
    if (!_id) {
      res
        .status(303)
        .json({ success: false, message: "id not provided invalid input" });
    } else {
      const Categories = await CategoriesModel.findById(_id);

      if (!Categories) {
        res
          .status(404)
          .json({ success: false, message: "Categories not found" });
      } else {
        next();
      }
    }
  } catch (error) {
    res.status(500).json({ success: false, message: `error, ${error}` });
  }
};
