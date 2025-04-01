import { FoodOrderModel } from "../../modules/foodOrder.model.js";

export const createFoodOrder = async (req, res) => {
  const { totalPrice, userId, items } = req.body;
  console.log(req.body);

  try {
    const FoodOrder = new FoodOrderModel({
      totalprice: totalPrice,
      user: userId,
      foodOrderItems: items,
    });
    FoodOrder.save();
    const rawFoodOrderdata = await FoodOrderModel.find();

    res.status(200).send(rawFoodOrderdata);
  } catch (error) {
    console.error("Error creating FoodOrder:", error);
    res
      .status(500)
      .json({ success: false, message: "Error creating FoodOrder" });
  }
};
