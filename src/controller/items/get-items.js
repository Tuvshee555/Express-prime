import { FoodItemModel } from "../../modules/foodOrderItem.model.js";

export const getItems = async (req, res) => {
  try {
    const items = await FoodItemModel.find();
    
    res.status(200).send(items);
  } catch (error) {
    res.status(500).send(`Error while getting items ${err}`);
  }
};
