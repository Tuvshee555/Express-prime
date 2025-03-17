import { FoodModel } from "../../modules/food.model.js";

export const updateFood = async (req, res) => {
  const { _id, foodName, price, image, ingredients, category } = req.body;

  try {
    const updatedFood = await FoodModel.findByIdAndUpdate(
      _id, 
      {
        foodName,
        price,
        ...(image && { image }),
        ingredients,
        category
      },
      { new: true } 
    );

    if (!updatedFood) {
      return res.status(404).json({ message: "Food item not found" });
    }

    res.status(200).json(updatedFood);
  } catch (error) {
    console.error("Error while updating food:", error);
    res.status(500).json({ message: "Error while updating food", error });
  }
};
