import express from "express";
import { createBio, getBio } from "../controllers/bio.controller.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, createBio);
router.get("/", auth, getBio);

export default router;
