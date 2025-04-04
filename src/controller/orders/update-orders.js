import { FoodOrderModel } from "../../modules/foodOrder.model.js";

export const updatedFoodOrder = async (req, res) => {
  const { _id } = req.params; // now using route param
  const updateData = req.body;

  try {
    const updatedOrder = await FoodOrderModel.findByIdAndUpdate(
      _id,
      updateData,
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).send("Order not found");
    }

    res.status(200).send(updatedOrder);
  } catch (error) {
    res.status(500).send(`Error while updating food order: ${error.message}`);
  }
};
