import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

// Load Stripe (replace with your own key)
const stripePromise = loadStripe("pk_test_51RW6ciP2GcdRiNmtV1x2QdeWytsMwSaeyBUsMxvd2aDbvYrwg7V6K8Eobco3nLRm9vJbQusJO1z1zF9kpUbN6A1z006FB7Z3gW");

// ✅ CheckoutForm Component
function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  // Get logged-in user & token (from localStorage or your auth context)
  const token = localStorage.getItem("userToken");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1️⃣ Create Payment Intent
      const res = await fetch("http://localhost:5000/api/payment/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      const { clientSecret } = await res.json();

      // 2️⃣ Confirm Card Payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: elements.getElement(CardElement) },
      });

      if (result.error) {
        alert(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        // 3️⃣ Call backend to confirm & store in DB
        await fetch("http://localhost:5000/api/payment/confirm", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            paymentIntentId: result.paymentIntent.id,
          }),
        });

        alert("Payment Successful 🎉");
      }
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: "100%" }}>
      <div style={styles.inputWrapper}>
        <label style={styles.label}>Secure Card Entry</label>
        <div style={styles.stripeContainer}>
          <CardElement options={cardStyles} />
        </div>
      </div>
      <button disabled={!stripe || loading} style={styles.button}>
        {loading ? "Processing..." : "Unlock Premium Access"}
      </button>
      <p style={styles.footerText}>Secure transaction powered by Stripe</p>
    </form>
  );
}

// ✅ Full Payment Page with 2 Columns
export default function PaymentPage() {
  return (
    <div style={styles.wrapper}>
      <Elements stripe={stripePromise}>
        <div style={styles.mainCard}>
          {/* LEFT SIDE */}
          <div style={styles.leftSide}>
            <div style={styles.glassContent}>
              <span style={styles.tag}>LIFETIME UPGRADE</span>
              <h1 style={styles.h1}>The Premium <br /> Collection.</h1>
              <p style={styles.p}>One small investment for a lifetime of professional opportunities.</p>

              <div style={styles.list}>
                <div style={styles.listItem}><span>✦</span> Advanced Design System</div>
                <div style={styles.listItem}><span>✦</span> ATS-Optimized Structure</div>
                <div style={styles.listItem}><span>✦</span> High-Resolution Export</div>
                <div style={styles.listItem}><span>✦</span> Priority Template Updates</div>
              </div>

              <div style={styles.priceTag}>
                <span style={styles.price}>$5</span>
                <span style={styles.once}>once</span>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div style={styles.rightSide}>
            <div style={styles.formContent}>
              <h2 style={styles.h2}>Checkout</h2>
              <p style={styles.sub}>Review your order and complete payment.</p>

              <div style={styles.orderSummary}>
                <div style={styles.summaryRow}>
                  <span>Premium Plan</span>
                  <span>$5.00</span>
                </div>
                <div style={styles.summaryRow}>
                  <span>Taxes</span>
                  <span>$0.00</span>
                </div>
              </div>

              <CheckoutForm />
            </div>
          </div>
        </div>
      </Elements>
    </div>
  );
}

// Theme & Card Styles
const theme = {
  deep: "#0f172a",
  accent: "#d4af37",
  soft: "#f8fafc",
  textMain: "#1e293b",
  textMuted: "#64748b"
};

const cardStyles = {
  style: {
    base: {
      fontSize: "15px",
      color: theme.textMain,
      fontFamily: "Inter, sans-serif",
      "::placeholder": { color: "#cbd5e1" },
    },
  },
};

const styles = {
  mainCard: {
    display: "flex",
    width: "900px",
    height: "580px",
    marginLeft: "80px",
    background: "#fff",
    borderRadius: "32px",
    overflow: "hidden",
    boxShadow: "0 40px 100px -20px rgba(0,0,0,0.15)"
  },
  leftSide: {
    width: "42%",
    background: `linear-gradient(135deg, ${theme.deep} 0%, #1e293b 100%)`,
    padding: "50px",
    color: "#fff",
    display: "flex",
    alignItems: "center"
  },
  glassContent: { width: "100%" },
  tag: { color: theme.accent, fontSize: "11px", fontWeight: "700", letterSpacing: "2px" },
  h1: { fontSize: "36px", margin: "15px 0", fontWeight: "800", lineHeight: "1.1" },
  p: { color: "#94a3b8", fontSize: "15px", lineHeight: "1.6", marginBottom: "30px" },
  list: { marginBottom: "40px" },
  listItem: { display: "flex", gap: "12px", marginBottom: "12px", fontSize: "14px", color: "#f1f5f9" },
  priceTag: { display: "flex", alignItems: "baseline", gap: "8px" },
  price: { fontSize: "42px", fontWeight: "700", color: "#fff" },
  once: { color: theme.accent, fontSize: "14px", fontWeight: "600" },

  rightSide: { width: "58%", padding: "60px", display: "flex", alignItems: "center" },
  formContent: { width: "100%" },
  h2: { fontSize: "24px", color: theme.textMain, fontWeight: "700" },
  sub: { color: theme.textMuted, fontSize: "14px", marginBottom: "30px" },
  orderSummary: { background: theme.soft, padding: "20px", borderRadius: "16px", marginBottom: "30px" },
  summaryRow: { display: "flex", justifyContent: "space-between", marginBottom: "10px", fontSize: "14px", fontWeight: "500" },

  inputWrapper: { marginBottom: "25px" },
  label: { fontSize: "12px", fontWeight: "700", color: theme.textMuted, marginBottom: "8px", display: "block", textTransform: "uppercase" },
  stripeContainer: { padding: "16px", border: "1px solid #e2e8f0", borderRadius: "12px" },
  button: {
    width: "100%",
    padding: "18px",
    background: theme.deep,
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    fontSize: "15px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 10px 20px -5px rgba(15, 23, 42, 0.3)"
  },
  footerText: { textAlign: "center", fontSize: "11px", color: "#cbd5e1", marginTop: "20px" }
};