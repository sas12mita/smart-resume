import express from "express";
import { createBio, getBio } from "../controllers/bioController.js";
const router = express.Router();

router.post("/",createBio);
router.get("/",getBio);

export default router;
