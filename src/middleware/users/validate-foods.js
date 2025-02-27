import { FoodModel } from "../../modules/food.model.js";

export const validateFood = async (req, res, next) => {
  const { _id } = req.body;

  try {
    if (!_id) {
      res
        .status(303)
        .json({ success: false, message: "id not provided invalid input" });
    } else {
      const Order = await FoodModel.findById(_id);

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
