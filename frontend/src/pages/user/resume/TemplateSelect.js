import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const templates = [
  { id: "template1", title: "Basic", thumbnail: "/image/basic.jpg", isPremium: false },
  { id: "template3", title: "Advance", thumbnail: "/image/advance.jpg", isPremium: true },
];

export default function TemplateSelect() {
  const navigate = useNavigate();
  const [hasPaid, setHasPaid] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  // Helper to get auth data consistently
  const getAuthData = () => {
    const token = localStorage.getItem("userToken"); // Matches your storage
    return { token };
  };

  const checkPayment = async () => {
        console.log("🔍 Checking payment status before allowing premium template.111..");

    const { token } = getAuthData();
    
    if (!token) {
      setHasPaid(false);
      setIsLoading(false);
      return;
    }
    console.log("🔍 Checking payment status before allowing premium template...");

    try {
          console.log("🔍 Checking payment status before allowing premium template...");

      const res = await axios.get("http://localhost:5000/api/payment/check-premium", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHasPaid(res.data.hasPaid);
    } catch (err) {
      console.error("Payment check failed:", err);
      setHasPaid(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const { user } = getAuthData();
    setCurrentUser(user);
    checkPayment();
  }, []);

  const handleTemplateClick = (template) => {
    if (!template.isPremium) {
      navigate(`/user/resume/create/${template.title.toLowerCase()}`);
      return;
    }

    const { token } = getAuthData();

    if (!token) {
      alert("Please login to access Premium templates");
      navigate("/user/login");
      return;
    }

    if (!hasPaid) {
      alert("This is a premium template. Please purchase to continue.");
      navigate("/user/dashboard/resume/checkout");
      return;
    }

    navigate(`/user/resume/create/${template.title.toLowerCase()}`);
  };

  if (isLoading) return <div style={{ padding: 20 }}>Loading...</div>;

  return (
    <>
      <style>{`
        .template-card { position: relative; width: 220px; border-radius: 12px; overflow: hidden; cursor: pointer; box-shadow: 0 4px 15px rgba(0,0,0,0.1); transition: transform 0.2s ease; }
        .template-card:hover { transform: scale(1.03); }
        .overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.7); color: white; display: flex; justify-content: center; align-items: center; text-align: center; opacity: 0; transition: opacity 0.3s ease; pointer-events: none; }
        .template-card:hover .overlay { opacity: 1; }
        .premium-badge { position: absolute; top: 10px; right: 10px; background: gold; color: black; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: bold; }
        .free-badge { position: absolute; top: 10px; left: 10px; background: green; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: bold; }
      `}</style>

      <div style={{ padding: 20 }}>
        <h2>Select Resume Template</h2>
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          {templates.map((t) => (
            <div key={t.id} className="template-card" onClick={() => handleTemplateClick(t)}>
              <img src={t.thumbnail} alt={t.title} width="100%" height="auto" />
              <h4 style={{ textAlign: "center", padding: 10 }}>{t.title} Resume</h4>
              
              {t.isPremium ? (
                <>
                  <div className="premium-badge">PREMIUM</div>
                  {(!currentUser || !hasPaid) && (
                    <div className="overlay">
                      <div>
                        <div style={{ fontSize: 40 }}>🔒</div>
                        <h3>Premium Template</h3>
                        <p>{!currentUser ? "Login required" : "$19 AUD Lifetime"}</p>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="free-badge">FREE</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}