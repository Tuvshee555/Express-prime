import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phonenumber: { type: Number },
  address: { type: String },
  role: {
    type: String,
    required: true,
    enum: ["USER", "ADMIN"],
  },
  orderedFoods: [
    {
      name: String,
      type: {
        type: { type: String },
      },
    },
  ],
  isVerified: { type: Boolean, default: false },
  resetToken: { type: String },           // new field for password reset
  resetTokenExpiry: { type: Date },       // optional: token expiry
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

export const UsersModel = mongoose.model("Users", usersSchema);
