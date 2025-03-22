import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import productRouter from "./routes/productRoutes.js";
import materialRouter from "./routes/materialRoutes.js";
import gradeRouter from "./routes/gradeRoutes.js";
import combinationRouter from "./routes/combinationRoutes.js";
dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/products", productRouter);
app.use("/api/materials", materialRouter);
app.use("/api/grades", gradeRouter);
app.use("/api/combinations", combinationRouter);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Sample Route
app.get("/", (req, res) => {
  res.send("Backend is running...");
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`Server running on port "http://localhost:${PORT}"`)
);
