import express from "express";
import { register, login } from "../controllers/userController.js";
import userAuth from "../middleware/userAuth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
// GET user dashboard data
router.get("/dashboard", userAuth, (req, res) => {
  res.json({
    name: req.user.fullname,
    status: "Logged In",
  });
})

export default router;
