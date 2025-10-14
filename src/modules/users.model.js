import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String }, // optional for Google login
  phonenumber: { type: Number },
  address: { type: String },
  role: { type: String, required: true, enum: ["USER", "ADMIN"], default: "USER" },
  orderedFoods: [
    {
      name: String,
      type: { type: String },
    },
  ],
  isVerified: { type: Boolean, default: false },
  resetToken: { type: String },
  resetTokenExpiry: { type: Date },
}, { timestamps: true });

export const UsersModel = mongoose.model("Users", usersSchema);
