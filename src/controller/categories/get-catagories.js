import { CategoriesModel } from "../../modules/categories.model.js";

export const getCategories = async (req, res) => {
  try {
    const categories = await CategoriesModel.find();
    
    res.status(200).send(categories);
  } catch (error) {
    res.status(500).send(`Error while getting categories ${err}`);
  }
};
