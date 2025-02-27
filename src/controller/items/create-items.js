import { FoodItemModel } from "../../modules/foodOrderItem.model.js";

export const createItems = async (req, res) => {
  const { quantity } = req.body;
  try {
    const Items = new FoodItemModel({
      quantity: quantity,
    });
    Items.save();
    const rawItemsdata = await FoodItemModel.find();

    res.status(200).send(rawItemsdata);
  } catch (error) {
    console.error("Error creating Items:", error);
    res.status(500).json({ success: false, message: "Error creating Items" });
  }
};
