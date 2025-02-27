import { CategoriesModel } from "../../modules/categories.model.js";

export const updateCategories = async (req, res) => {
  const { _id, categoryName} = req.body;
  try {
    const updatedUser = await CategoriesModel.findByIdAndUpdate(
      { _id: _id },
      { categoryName: categoryName}
    );
    res.status(202).send(updatedUser);
  } catch (error) {
    res.status(500).send(`Error while updating categories ${error}`);
  }
};
