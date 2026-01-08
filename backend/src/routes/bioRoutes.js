import express from "express";
import { saveBio, getBio } from "../controllers/bioController.js";

import  userAuth  from "../middleware/userAuth.js"

const router = express.Router();

// ONLY for logged-in users
router.get("/", userAuth, getBio);
router.post("/", userAuth, saveBio);

export default router;
