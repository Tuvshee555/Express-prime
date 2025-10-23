import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import { userRouter } from "./routers/user.router.js";
import { foodRouter } from "./routers/food.router.js";
import { categoryRouter } from "./routers/category.router.js";
import { items } from "./routers/items.router.js";
import { qpayRouter } from "./routers/qpay.router.js";
import { orderRouter } from "./routers/Order.router.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

mongoose.connect(process.env.DATA_BASE_CONNECT_URL)
  .then(() => console.log("✅ Successfully connected to MongoDB"))
  .catch(err => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

app.use(cors());
app.use(express.json());

// Routers
app.use("/food", foodRouter);
app.use("/order", orderRouter);
app.use("/user", userRouter);
app.use("/category", categoryRouter);
app.use("/items", items);
app.use("/qpay", qpayRouter);

// Test route
app.get("/", (req, res) => res.send("Express Prime API is running 🚀"));

app.listen(port, () => console.log(`🚀 Server running at http://localhost:${port}`));
