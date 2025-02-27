import { FoodOrderModel } from "../../modules/foodOrder.model.js";

export const updatedFoodOrder = async (req, res) => {
  const { _id, user, totalprice, Image, foodOrderItems, status } = req.body;
  try {
    const updatedFoodOrder = await FoodOrderModel.findByIdAndUpdate(
      { _id: _id },
      {
        user: user,
        totalprice: totalprice,
        Image: Image,
        foodOrderItems: foodOrderItems,
        status: status,
      }
    );
    res.status(202).send(updatedFoodOrder);
  } catch (error) {
    res.status(500).send(`Error while updating food order ${error}`);
  }
};
