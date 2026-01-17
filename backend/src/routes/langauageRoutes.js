import express from "express";
import {
  createLanguage,
  getLanguages,
  updateLanguage,
  deleteLanguage,
} from "../controllers/languageController.js";

import userAuth from "../middleware/userAuth.js";

const router = express.Router();

router.post("/", userAuth, createLanguage);
router.get("/", userAuth, getLanguages);
router.put("/:id", userAuth, updateLanguage);
router.delete("/:id", userAuth, deleteLanguage);

export default router;
