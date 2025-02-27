import { FoodItemModel } from "../../modules/foodOrderItem.model.js";

export const deleteItems = async (req, res) => {
  const { _id } = req.body;

  try {
    await FoodItemModel.findByIdAndDelete(_id);

    res
      .status(200)
      .json({ success: true, message: "Succesfully deleted items" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting items" });
  }
};
