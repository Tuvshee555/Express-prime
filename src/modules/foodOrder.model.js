import mongoose from "mongoose";

const foodOrderSchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, require: true, ref: "users" },
  totalprice: { type: Number, require: true },
  Image: { type: String, require: true },
  foodOrderItems: [{ type: mongoose.Types.ObjectId, ref: "foodOrderItems" }],
  status: {
    type: String,
    enum: ["PENDING", "CANCELLED", "DELIVERED"],
    require: true,
  },
});

export const FoodOrderModel = mongoose.model("foodOrder", foodOrderSchema);
