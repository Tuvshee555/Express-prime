import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) return;
  try {
    await mongoose.connect(process.env.DATA_BASE_CONNECT_URL || "mongodb+srv://ganturtuvshinsaihan:wXrLlB7dTEaiffSH@cluster0.b96aswa.mongodb.net/");
    isConnected = true;
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    throw err;
  }
};
