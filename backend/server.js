import express from "express"
import cors from "cors";
import dotenv from "dotenv";
import db from "./src/config/db.js";
import path from "path";

express.urlencoded({ extended: true })

import userRoute from "./src/routes/userRoute.js";
import bioRoutes from "./src/routes/bioRoutes.js";
import educationRoutes from "./src/routes/educationRoutes.js";
import adminRoutes from "./src/routes/adminRoutes.js"
import resumeTemplateRoutes from "./src/routes/resumeTemplateRoutes.js"
import aiRoutes from "./src/routes/aiRoutes.js"


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Connect Routes
app.use("/api/users", userRoute);
app.use("/api/bio", bioRoutes);
app.use("/api/education", educationRoutes);
app.use("/api/admin", adminRoutes);


app.use("/uploads/", express.static(path.join(process.cwd(), "uploads")));

app.use("/api/admin/resumetemplates", resumeTemplateRoutes);

app.use('/api', aiRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
