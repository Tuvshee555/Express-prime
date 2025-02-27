import { FoodModel } from "../../modules/food.model.js";
export const deleteFood = async (req, res) => {
  const { id } = req.body;

  try {
    await FoodModel.findByIdAndDelete(id);

    res
      .status(200)
      .json({ success: true, message: "Succesfully deleted food" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting food" });
  }
};
