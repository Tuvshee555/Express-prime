import { FoodOrderModel } from "../../modules/foodOrder.model.js";

export const getAllOrder = async (req, res) => {
  try {
    const orders = await FoodOrderModel.find()
      .populate({ path: "user", model: "users" })
      .populate({ path: "foodOrderItems.foodId", model: "food" })
      .exec();

    res.status(200).send(orders);
  } catch (error) {
    console.error("Error while getting food orders:", error);
    res.status(500).send(`Error while getting food order: ${error.message}`);
  }
};
