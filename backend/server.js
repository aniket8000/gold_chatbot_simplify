import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import aiRoutes from "./routes/aiRoutes.js";
import goldRoutes from "./routes/goldRoutes.js";

const app = express();

// Middlewares
app.use(
  cors({
    origin: [process.env.CLIENT_URL, "http://localhost:5173"], // allow both local dev & deployed frontend
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use("/api/ai", aiRoutes);
app.use("/api/gold", goldRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB Connection Error:", err));
