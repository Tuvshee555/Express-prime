import { FoodItemModel } from "../../modules/foodOrderItem.model.js";

export const updateItems = async (req, res) => {
  const { _id, quantity} = req.body;
  try {
    const updatedUser = await FoodItemModel.findByIdAndUpdate(
      { _id: _id },
      { quantity: quantity}
    );
    res.status(202).send(updatedUser);
  } catch (error) {
    res.status(500).send(`Error while updating items ${error}`);
  }
};
