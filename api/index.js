import express from "express";
import cors from "cors";
import serverless from "serverless-http";
import dotenv from "dotenv";
import { connectDB } from "../src/db.js"; // ✅ single connection helper

// Routers
import { userRouter } from "../src/routers/user.router.js";
import { foodRouter } from "../src/routers/food.router.js";
import { categoryRouter } from "../src/routers/category.router.js";
import { items } from "../src/routers/items.router.js";
import { qpayRouter } from "../src/routers/qpay.router.js";
import { orderRouter } from "../src/routers/Order.router.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB only once
await connectDB();

// ✅ Routers
app.use("/food", foodRouter);
app.use("/order", orderRouter);
app.use("/user", userRouter);
app.use("/category", categoryRouter);
app.use("/items", items);
app.use("/qpay", qpayRouter);

// ✅ Test route
app.get("/", (req, res) => {
  res.status(200).send("Express Prime API is running 🚀");
});

// ✅ Export for Vercel
export const handler = serverless(app);
export default app;







// import express from "express";
// import cors from "cors";
// import serverless from "serverless-http";
// import mongoose from "mongoose";
// import dotenv from "dotenv";

// // Routers
// import { userRouter } from "../src/routers/user.router.js";
// import { foodRouter } from "../src/routers/food.router.js";
// import { categoryRouter } from "../src/routers/category.router.js";
// import { items } from "../src/routers/items.router.js";
// import { qpayRouter } from "../src/routers/qpay.router.js";
// import { orderRouter } from "../src/routers/Order.router.js";
// import { connectDB } from "../src/db.js"; // <- import helper

// dotenv.config();

// const port = process.env.PORT || 4000;

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.use(async (req, res, next) => {
//   try {
//     await connectDB();
//     next();
//   } catch (err) {
//     res.status(500).send("Database connection failed");
//   }
// });


// dotenv.config();


// const mongoURI = process.env.DATA_BASE_CONNECT_URL;
// mongoose
//   .connect(mongoURI)
//   .then(() => console.log("✅ Successfully connected to MongoDB"))
//   .catch((err) => {
//     console.error("❌ MongoDB connection error:", err);
//     process.exit(1);
//   });

// app.use(cors());
// app.use(express.json());

// // --- Routers
// app.use("/food", foodRouter);
// app.use("/order", orderRouter);
// app.use("/user", userRouter);
// app.use("/category", categoryRouter);
// app.use("/items", items);
// app.use("/qpay", qpayRouter);

// app.get("/", (req, res) => res.send("Express Prime API is running 🚀"));

// // Export for Vercel
// export default serverless(app);
// app.listen(port, () => {
//   console.log(`🚀 Server running at http://localhost:${port}`);
// });
