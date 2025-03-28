import { FoodOrderModel } from "../../modules/foodOrder.model.js";

export const createFoodOrder = async (req, res) => {
  const { _id, totalprice, Image, foodOrderItems, status } = req.body;
  try {
    const FoodOrder = new FoodOrderModel({
      totalprice: totalprice,
      Image: Image,
      status: status,
      // _id: _id
      

    });
    FoodOrder.save();
    const rawFoodOrderdata = await FoodOrderModel.find();

    res.status(200).send(rawFoodOrderdata);
  } catch (error) {
    console.error("Error creating FoodOrder:", error);
    res.status(500).json({ success: false, message: "Error creating FoodOrder" });
  }
};
