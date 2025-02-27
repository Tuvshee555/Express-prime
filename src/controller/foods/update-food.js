import { FoodModel } from "../../modules/food.model.js";
export const updateFood = async (req, res) => {
  const { _id, foodName, price, Image, ingredients } = req.body;
  try {
    const updatedFood = await FoodModel.findByIdAndUpdate(
      { _id: _id },
      {
        foodName: foodName,
        price: price,
        Image: Image,
        ingredients: ingredients,
      }
    );
    res.status(202).send(updatedFood);
  } catch (error) {
    res.status(500).send(`Error while updating food ${error}`);
  }
};
