  import mongoose from "mongoose";

  const usersSchema = new mongoose.Schema({
    email: { type: String, require: true },
    password: { type: String, require: true },
    phonenumber: { type: Number },
    address: { type: String },
    role: {
      type: String,
      require: true,
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
    createdAt: { type: Date, default: Date.now },
    updateAt: { type: Date },
  });

  export const UsersModel = mongoose.model("users", usersSchema);
