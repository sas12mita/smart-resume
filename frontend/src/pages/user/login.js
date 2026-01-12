import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

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

  // Internal CSS
  const styles = {
    container: {
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f0f8ff",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      padding: "20px",
    },
    authBox: {
      backgroundColor: "white",
      borderRadius: "20px",
      boxShadow: "0 10px 30px rgba(0, 100, 255, 0.2)",
      padding: "40px",
      width: "100%",
      maxWidth: "420px",
      border: "1px solid #e3f2ff",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
    },
    title: {
      color: "#1a56db",
      textAlign: "center",
      marginBottom: "30px",
      fontSize: "32px",
      fontWeight: "700",
      letterSpacing: "-0.5px",
      background: "linear-gradient(135deg, #1a56db 0%, #3b82f6 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
    input: {
      padding: "16px 20px",
      fontSize: "16px",
      border: "2px solid #e0f2fe",
      borderRadius: "12px",
      outline: "none",
      transition: "all 0.3s ease",
      backgroundColor: "#f8fafc",
      color: "#1e293b",
    },
    inputFocus: {
      borderColor: "#3b82f6",
      boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
      backgroundColor: "white",
    },
    button: {
      backgroundColor: "#1a56db",
      color: "white",
      padding: "16px",
      fontSize: "16px",
      fontWeight: "600",
      border: "none",
      borderRadius: "12px",
      cursor: "pointer",
      transition: "all 0.3s ease",
      marginTop: "10px",
      letterSpacing: "0.5px",
      background: "linear-gradient(135deg, #1a56db 0%, #3b82f6 100%)",
    },
    buttonHover: {
      transform: "translateY(-2px)",
      boxShadow: "0 8px 20px rgba(26, 86, 219, 0.3)",
      background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)",
    },
    link: {
      textAlign: "center",
      marginTop: "20px",
      color: "#64748b",
      fontSize: "14px",
    },
    linkSpan: {
      color: "#3b82f6",
      cursor: "pointer",
      fontWeight: "600",
      textDecoration: "none",
      transition: "color 0.3s ease",
    },
    decoration: {
      position: "absolute",
      width: "300px",
      height: "300px",
      borderRadius: "50%",
      background: "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(29, 78, 216, 0.05) 100%)",
      top: "10%",
      right: "10%",
      zIndex: "-1",
    },
    decoration2: {
      position: "absolute",
      width: "200px",
      height: "200px",
      borderRadius: "50%",
      background: "linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(29, 78, 216, 0.03) 100%)",
      bottom: "10%",
      left: "10%",
      zIndex: "-1",
    },
    logo: {
      textAlign: "center",
      marginBottom: "20px",
      fontSize: "24px",
      fontWeight: "bold",
      color: "#1a56db",
    }
  };

  return (
    <div style={styles.container}>
      {/* Background decorations */}
      <div style={styles.decoration}></div>
      <div style={styles.decoration2}></div>

      <div
        style={styles.authBox}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-5px)";
          e.currentTarget.style.boxShadow = "0 15px 40px rgba(0, 100, 255, 0.25)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 10px 30px rgba(0, 100, 255, 0.2)";
        }}
      >
        <div style={styles.logo}>🔐 SecureLogin</div>
        <h2 style={styles.title}>Welcome Back</h2>
        <form
          style={styles.form}
          onSubmit={handleSubmit}
        >
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            onChange={handleChange}
            required
            style={styles.input}
            onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
            onBlur={(e) => {
              e.target.style.borderColor = "#e0f2fe";
              e.target.style.boxShadow = "none";
              e.target.style.backgroundColor = "#f8fafc";
            }}
          />
          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            onChange={handleChange}
            required
            style={styles.input}
            onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
            onBlur={(e) => {
              e.target.style.borderColor = "#e0f2fe";
              e.target.style.boxShadow = "none";
              e.target.style.backgroundColor = "#f8fafc";
            }}
          />
          <button
            className="btn-blue"
            type="submit"
            style={styles.button}
            onMouseEnter={(e) => Object.assign(e.target.style, styles.buttonHover)}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "none";
              e.target.style.background = "linear-gradient(135deg, #1a56db 0%, #3b82f6 100%)";
            }}
          >
            Login to Dashboard
          </button>
        </form>
        <Link to="/user/register" style={styles.link}>
          Don't have an account? <span style={styles.linkSpan}>Sign up here</span>
        </Link>
      </div>
    </div>
  );
}