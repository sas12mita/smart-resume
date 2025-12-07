import express from "express";
import {
  createLanguage,
  getLanguages,
  getLanguage,
  updateLanguage,
  deleteLanguage
} from "../controllers/languageController.js";

const router = express.Router();

router.post("/", createLanguage);
router.get("/:user_id", getLanguages);
router.get("/single/:id", getLanguage);
router.put("/:id", updateLanguage);
router.delete("/:id", deleteLanguage);

export default router;
