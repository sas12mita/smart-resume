import express from "express";
import { paidPremium, createPaymentIntent, confirmPayment } from "../controllers/paymentController.js"
import userAuth from "../middleware/userAuth.js";

const router = express.Router();
router.get("/check-premium", userAuth, paidPremium);
router.post("/create-payment-intent", userAuth, createPaymentIntent); // Added this
router.post("/confirm", userAuth, confirmPayment); // Added this

export default router;