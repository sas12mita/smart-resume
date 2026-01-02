import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import path from "path";

import db from "./src/config/db.js";

// Routes
import userRoute from "./src/routes/userRoute.js";
import bioRoutes from "./src/routes/bioRoutes.js";
import educationRoutes from "./src/routes/educationRoutes.js";
import adminRoutes from "./src/routes/adminRoutes.js";
import resumeTemplateRoutes from "./src/routes/resumeTemplateRoutes.js";
import aiRoutes from "./src/routes/aiRoutes.js";

const app = express();

// ✅ CORS middleware (must come FIRST)
app.use(cors({
  origin: "http://localhost:3000", // React frontend
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// ✅ Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Static uploads folder
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// ✅ Connect routes
app.use("/api/user", userRoute);
app.use("/api/bio", bioRoutes);
app.use("/api/education", educationRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admin/resumetemplates", resumeTemplateRoutes);
app.use("/api", aiRoutes);

// ✅ Start server
const PORT = process.env.BACKEND_PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
