import { FoodModel } from "../../modules/food.model.js";
export const updateFood = async (req, res) => {
  const { _id, foodName, price, image, ingredients, category } = req.body;
  try {
    const updatedFood = await FoodModel.findByIdAndUpdate(
      { _id: _id },
      {
        foodName: foodName,
        price: price,
        image: image,
        ingredients: ingredients,
        category: category
      }
    );
    res.status(202).send(updatedFood);
    
  } catch (error) {
    res.status(500).send(`Error while updating food ${error}`);
  }
};
