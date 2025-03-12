import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  foodName: { type: String, require: true },
  price: { type: String, require: true },
  image: { type: String, require: true },
  address: { type: String },
  ingredients: { type: String, require: true },
  category: { type: mongoose.Types.ObjectId, ref: "catagory" },
});

export const FoodModel = mongoose.model("food", foodSchema);
