import express from "express";
import {
  getTemplates,
  getTemplate,
  createTemplate,
  updateTemplate,
  deleteTemplate
} from "../controllers/resumeTemplateController.js";
import { uploadTemplateThumbnail } from "../middleware/uploadTemplateThumbnail.js";

const router = express.Router();

router.get("/", getTemplates);
router.get("/:id", getTemplate);
router.post("/", uploadTemplateThumbnail.single("thumbnail"), createTemplate);
router.put("/:id", uploadTemplateThumbnail.single("thumbnail"), updateTemplate);
router.delete("/:id", deleteTemplate);

export default router;
