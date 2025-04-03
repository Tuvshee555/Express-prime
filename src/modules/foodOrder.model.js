import mongoose from "mongoose";

const foodOrderSchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, require: true, ref: "users" },
  totalprice: { type: Number, require: true },
  foodOrderItems: [
    {
      foodId: {
        type: mongoose.Types.ObjectId,
        ref: "FoodModel",
        require: true,
      },
      quantity: { type: Number, require: true },
    },
  ],
  status: {
    type: String,
    enum: ["PENDING", "CANCELLED", "DELIVERED"],
    default: "PENDING",
    require: true,
  },
  createdAt: { type: Date, default: Date.now },
  location: { type: String, require: true },
});

export const FoodOrderModel = mongoose.model("foodOrder", foodOrderSchema);
