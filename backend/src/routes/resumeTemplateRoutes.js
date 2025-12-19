import express from "express";
import {
  getResumeTemplates,
  getResumeTemplate,
  createResumeTemplate,
  updateResumeTemplate,
  deleteResumeTemplate
} from "../controllers/resumeTemplateController.js";

import { uploadTemplateThumbnail } from "../middleware/uploadTemplateThumbnail.js";

const router = express.Router();

// READ ALL
router.get("/", getResumeTemplates);

// READ ONE
router.get("/:id", getResumeTemplate);

// CREATE
router.post(
  "/",
  uploadTemplateThumbnail.single("thumbnail"),
  createResumeTemplate
);

// UPDATE
router.put(
  "/:id",
  uploadTemplateThumbnail.single("thumbnail"),
  updateResumeTemplate
);

// DELETE
router.delete("/:id", deleteResumeTemplate);

export default router;
