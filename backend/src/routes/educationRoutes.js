import express from "express";
import { addEducation, getEducation } from "../controllers/educationController.js";

const router = express.Router();

router.post("/", addEducation);
router.get("/", getEducation);

export default router;
