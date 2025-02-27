import { FoodOrderModel } from "../../modules/foodOrder.model.js";

export const deleteFoodOrder = async (req, res) => {
  const { _id } = req.body;

  try {
    await FoodOrderModel.findByIdAndDelete(_id);

    res
      .status(200)
      .json({ success: true, message: "Succesfully deleted food order" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting food order" });
  }
};
