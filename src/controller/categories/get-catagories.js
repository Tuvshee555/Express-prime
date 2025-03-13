import { CategoriesModel } from "../../modules/categories.model.js";

export const getCategories = async (req, res) => {
  try {
    const categoriesWithCount = await CategoriesModel.aggregate([
      {
        $lookup: {
          from: "foods",
          localField: "_id",
          foreignField: "category",
          as: "foods",
        },
      },
      {
        $project: {
          categoryName: 1,
          foodCount: { $size: "$foods" },
        },
      },
    ]);

    res.status(200).json(categoriesWithCount);
  } catch (error) {
    res.status(500).send(`Error while getting categories ${err}`);
  }
};
