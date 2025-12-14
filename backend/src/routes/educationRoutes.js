import express from "express";
import { addEducation, getEducation } from "../controllers/education.controller.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, addEducation);
router.get("/", auth, getEducation);

export default router;
