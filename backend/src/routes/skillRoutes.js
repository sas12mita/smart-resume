import express from "express";
import {
  createSkill,
  getSkills,
  getSkillById,
  updateSkill,
  deleteSkill,
} from "../controllers/skillController.js";

import userAuth from "../middleware/userAuth.js";

const router = express.Router();

router.post("/", userAuth, createSkill);
router.get("/", userAuth, getSkills);
router.get("/:id", userAuth, getSkillById);
router.put("/:id", userAuth, updateSkill);
router.delete("/:id", userAuth, deleteSkill);

export default router;
