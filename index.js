import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import { userRouter } from "./src/routers/user.router.js";
import { orderRouter } from "./src/routers/Order.router.js";
import { FoodRouter } from "./src/routers/Food.router.js";
import { categoryRouter } from "./src/routers/category.router.js";
import { items } from "./src/routers/items.router.js";
import { qpayRouter } from "./src/routers/qpay.router.js";


dotenv.config();

const app = express();
const port = process.env.PORT

const mongoURI = process.env.DATA_BASE_CONNECT_URL;

mongoose
  .connect(mongoURI)
  .then(() => console.log("✅ Successfully connected to MongoDB"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

app.use(cors());
app.use(express.json());

// Routers
app.use("/food", FoodRouter);
app.use("/order", orderRouter);
app.use("/user", userRouter);
app.use("/category", categoryRouter);
app.use("/items", items);
app.use("/qpay", qpayRouter);

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
