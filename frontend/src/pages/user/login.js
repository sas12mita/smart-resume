import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
//  const API_URL = process.env.REACT_APP_API_URL;

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const secureLoginEndpoint = `http://localhost:5000/api/user/login`;

      const res = await axios.post(secureLoginEndpoint, form, {
        headers: { "Content-Type": "application/json" }
      });

      localStorage.setItem("userToken", res.data.token);
      navigate("/user/dashboard");

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-box">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button className="btn-blue">Login</button>
      </form>
    </div>
  );
}
