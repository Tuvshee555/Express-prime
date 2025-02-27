import { FoodOrderModel } from "../../modules/foodOrder.model.js";

export const validateFoodOrder = async (req, res, next) => {
  const { _id } = req.body;

  try {
    if (!_id) {
      res
        .status(303)
        .json({ success: false, message: "id not provided invalid input" });
    } else {
      const Order = await FoodOrderModel.findById(_id);

      if (!Order) {
        res
          .status(404)
          .json({ success: false, message: "Order not found" });
      } else {
        next();
      }
    }
  } catch (error) {
    res.status(500).json({ success: false, message: `error, ${error}` });
  }
};
