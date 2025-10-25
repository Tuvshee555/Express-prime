import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    invoice_id: { type: String, required: true },
    order_id: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ["PENDING", "PAID"], default: "PENDING" },
  },
  { timestamps: true }
);

export const Payment = mongoose.model("Payment", paymentSchema);
