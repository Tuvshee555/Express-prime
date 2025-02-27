import { FoodOrderModel } from "../../modules/foodOrder.model.js";

export const getFoodOrder = async (req, res) => {
  try {
    const foodOrder = await FoodOrderModel.find();

    res.status(200).send(foodOrder);
  } catch (error) {
    res.status(500).send(`Error while getting food order ${error}`);
  }
};
