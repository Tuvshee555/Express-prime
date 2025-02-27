import { FoodModel } from "../../modules/food.model.js";

export const getFood = async (req, res) => {
  try {
    const Food = await FoodModel.find();
    
    res.status(200).send(Food);
  } catch (err) {
    res.status(500).send(`Error while getting Food ${err}`);
  }
};
