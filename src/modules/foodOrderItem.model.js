import mongoose from "mongoose";

const foodOrderItem = new mongoose.Schema({
  food: { type: mongoose.Types.ObjectId, ref: "food" },
  quantity: { type: Number, require: true },
  catagory: { type: mongoose.Types.ObjectId, ref: "catagories" },
});

export const FoodItemModel = mongoose.model("foodOrderItem", foodOrderItem);
