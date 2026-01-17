import express from "express";
import {
  createTraining,
  getTrainings,
  updateTraining,
  deleteTraining,
} from "../controllers/trainingController.js";

import userAuth from "../middleware/userAuth.js";

const router = express.Router();

// CREATE training
router.post("/", userAuth, createTraining);

// GET all trainings (logged-in user)
router.get("/", userAuth, getTrainings);

// UPDATE training
router.put("/:id", userAuth, updateTraining);

// DELETE training
router.delete("/:id", userAuth, deleteTraining);

export default router;
