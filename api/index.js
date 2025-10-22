import express from "express";
import cors from "cors";
import serverless from "serverless-http";
import dotenv from "dotenv";

// Routers
import { userRouter } from "../src/routers/user.router.js";
import { foodRouter } from "../src/routers/food.router.js";
// ...other routers
import { connectDB } from "../src/db.js"; // <- import helper

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// --- Connect to MongoDB safely on each request
app.use(async (req, res, next) => {
  try {
    await connectDB(); // ensure DB is connected
    next();
  } catch (err) {
    res.status(500).send("Database connection failed");
  }
});

// --- Routers
app.use("/user", userRouter);
app.use("/food", foodRouter);
// ...other routers

// Test route
app.get("/", (req, res) => res.send("Express Prime API is running 🚀"));

// Export for Vercel
export default serverless(app);
