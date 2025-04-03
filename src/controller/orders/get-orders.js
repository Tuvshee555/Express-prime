import { FoodOrderModel } from "../../modules/foodOrder.model.js";

export const getFoodOrder = async (req, res) => {
  try {
    const { _id } = req.params;

    if (!_id) {
      return res.status(400).send("User ID is required");
    }

    const foodOrders = await FoodOrderModel.find({ user: _id })
      .populate({ path: "foodOrderItems.foodId", model: "food" })
      .exec();

    if (!foodOrders || foodOrders.length === 0) {
      return res.status(404).send("No food orders found for this user");
    }

    res.status(200).send(foodOrders);
  } catch (error) {
    console.error("Error while getting food orders:", error);
    res.status(500).send(`Error while getting food order: ${error.message}`);
  }
};
