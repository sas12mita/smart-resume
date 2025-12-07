import express from "express";
import {
  createHobby,
  getHobbies,
  getHobby,
  updateHobby,
  deleteHobby
} from "../controllers/hobbyController.js";

const router = express.Router();

router.post("/", createHobby);
router.get("/:user_id", getHobbies);
router.get("/single/:id", getHobby);
router.put("/:id", updateHobby);
router.delete("/:id", deleteHobby);

export default router;
