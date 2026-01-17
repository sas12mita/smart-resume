import express from "express";
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";

import userAuth from "../middleware/userAuth.js";

const router = express.Router();

router.post("/", userAuth, createProject);
router.get("/", userAuth, getProjects);
router.get("/:id", userAuth, getProjectById);
router.put("/:id", userAuth, updateProject);
router.delete("/:id", userAuth, deleteProject);

export default router;
