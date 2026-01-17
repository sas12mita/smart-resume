import express from "express";
import {
  createHobby,
  getHobbies,
  updateHobby,
  deleteHobby,
} from "../controllers/hobbyController.js";

import userAuth from "../middleware/userAuth.js";

const router = express.Router();

router.post("/", userAuth, createHobby);
router.get("/", userAuth, getHobbies);
router.put("/:id", userAuth, updateHobby);
router.delete("/:id", userAuth, deleteHobby);

export default router;
