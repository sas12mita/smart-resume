import express from "express";
import {
  createEducation,
  getEducations,
  getEducationById,
  updateEducation,
  deleteEducation,
} from "../controllers/educationController.js";

import userAuth from "../middleware/userAuth.js";

const router = express.Router();

router.post("/", userAuth, createEducation);
router.get("/", userAuth, getEducations);
router.get("/:id", userAuth, getEducationById);
router.put("/:id", userAuth, updateEducation);
router.delete("/:id", userAuth, deleteEducation);

export default router;
