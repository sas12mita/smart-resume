import db from "../config/db.js";
import Stripe from "stripe"; // 1. Import Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); 
export const paidPremium = async (req, res) => {
  try {
    console.log("hello testing");
    // Determine the ID (checks for both .id and .userId to be safe)
    const userId = req.user.id || req.user.userId; 
    
    console.log("Database Check - Looking for user_id:", userId);

    const [rows] = await db.query(
      "SELECT id FROM payments WHERE user_id = ? LIMIT 1",
      [userId]
    );

    if (rows.length > 0) {
      return res.json({ hasPaid: true });
    } else {
      return res.json({ hasPaid: false });
    }
  } catch (error) {
    console.error("Payment check error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const createPaymentIntent = async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 500, // $5 in cents
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Create PaymentIntent error:", error);
    res.status(500).json({ message: error.message });
  }
};

// ✅ Confirm Payment after frontend success
export const confirmPayment = async (req, res) => {
  const { paymentIntentId } = req.body;
  const userId = req.user.id || req.user.userId;

  try {
    // Verify with Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === "succeeded") {
      // Store in payments table
      await db.query(
        "INSERT INTO payments (user_id, stripe_payment_intent_id, amount, status) VALUES (?, ?, ?, ?)",
        [userId, paymentIntent.id, paymentIntent.amount, paymentIntent.status]
      );

      // Update user as paid
      await db.query("UPDATE users SET is_paid = 1 WHERE id = ?", [userId]);

      return res.json({ success: true });
    } else {
      return res.status(400).json({ message: "Payment not completed" });
    }
  } catch (error) {
    console.error("Confirm Payment error:", error);
    res.status(500).json({ message: error.message });
  }
};