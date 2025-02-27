import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  foodName: { type: String, require: true },
  price: { type: String, require: true },
  Image: { type: String, require: true },
  address: { type: String },
  ingredients: { type: String, require: true },
  category: { type: mongoose.Types.ObjectId, ref: "catagories" },
});

export const FoodModel = mongoose.model("food", foodSchema);
