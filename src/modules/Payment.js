import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  invoice_id: String,
  order_id: String,
  amount: Number,
  status: { type: String, default: "PENDING" },
  createdAt: { type: Date, default: Date.now },
});

export const Payment = mongoose.model("Payment", paymentSchema);
