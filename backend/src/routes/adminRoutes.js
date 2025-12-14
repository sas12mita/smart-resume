import express from "express";
import { adminLogin } from "../controllers/adminController.js";
import { adminAuth } from "../middleware/adminAuth.js";

const router = express.Router();

router.post("/login", adminLogin);

// EXAMPLE    admin route
router.get("/dashboard", adminAuth, (req, res) => {
  res.json({ msg: "Welcome to Admin Dashboard!" });
});

export default router;
