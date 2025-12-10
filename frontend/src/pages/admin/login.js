import { useState } from "react";
import axios from "axios";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("/api/admin/login", { email, password });

      localStorage.setItem("adminToken", res.data.token);
      window.location.href = "/admin/dashboard"; 
    } catch (err) {
      alert("Invalid admin login");
    }
  };

  const wrapper = {
    width: "300px",
    margin: "100px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    textAlign: "center"
  };

  return (
    <div style={wrapper}>
      <h2>Admin Login</h2>
      <input
        type="email"
        placeholder="Admin Email"
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
      />
      <input
        type="password"
        placeholder="Admin Password"
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
      />
      <button onClick={handleLogin} style={{ width: "100%", padding: "10px" }}>
        Login
      </button>
    </div>
  );
}
