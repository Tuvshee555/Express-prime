import express from "express";
import mongoose from "mongoose";
import { userRouter } from "./routers/user-router.js";
import cors from "cors";

const mongoURI =
  "mongodb+srv://tuvshee894:pMGouSOSywNnqc7d@cluster0.vds8d.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0";

const app = express();
const port = 4000;

const connectDb = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

connectDb();

app.use(express.json());
app.use(cors());

app.use("/users", userRouter); 
app.use("/catagory", userRouter)

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
