import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear error for this field when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.fullname.trim()) {
      newErrors.fullname = "Full name is required";
    }
    
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setLoading(true);
    try {
      const registerEndpoint = `http://localhost:5000/api/user/register`;
      
      // Remove confirmPassword before sending to API
      const { confirmPassword, ...registerData } = form;

      const res = await axios.post(registerEndpoint, registerData, {
        headers: { "Content-Type": "application/json" }
      });

      alert(res.data.message || "Registration successful!");
      navigate("/user/login");

    } catch (err) {
      console.error("Registration error:", err);
      alert(err.response?.data?.message || err.response?.data?.error || "Registration failed");
      
      // Set specific error for duplicate email
      if (err.response?.data?.message?.includes("Email already exists")) {
        setErrors({ ...errors, email: "Email already registered" });
      }
    } finally {
      setLoading(false);
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
      position: "relative",
      overflow: "hidden",
    },
    authBox: {
      backgroundColor: "white",
      borderRadius: "20px",
      boxShadow: "0 10px 30px rgba(0, 100, 255, 0.2)",
      padding: "40px",
      width: "100%",
      maxWidth: "450px",
      border: "1px solid #e3f2ff",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      zIndex: "1",
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
    subtitle: {
      textAlign: "center",
      color: "#64748b",
      marginBottom: "30px",
      fontSize: "16px",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "15px",
    },
    inputGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "5px",
    },
    label: {
      fontSize: "14px",
      fontWeight: "600",
      color: "#1e293b",
      marginLeft: "5px",
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
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    inputError: {
      borderColor: "#ef4444",
      backgroundColor: "#fef2f2",
    },
    inputFocus: {
      borderColor: "#3b82f6",
      boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
      backgroundColor: "white",
    },
    errorText: {
      color: "#ef4444",
      fontSize: "13px",
      marginLeft: "5px",
      marginTop: "2px",
      minHeight: "18px",
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
      opacity: loading ? "0.7" : "1",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    buttonHover: {
      transform: "translateY(-2px)",
      boxShadow: "0 8px 20px rgba(26, 86, 219, 0.3)",
      background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)",
    },
    loginLink: {
      textAlign: "center",
      marginTop: "25px",
      color: "#64748b",
      fontSize: "15px",
    },
    link: {
      color: "#3b82f6",
      cursor: "pointer",
      fontWeight: "600",
      textDecoration: "none",
      transition: "color 0.3s ease",
      marginLeft: "5px",
    },
    decoration: {
      position: "absolute",
      width: "300px",
      height: "300px",
      borderRadius: "50%",
      background: "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(29, 78, 216, 0.05) 100%)",
      top: "10%",
      right: "10%",
      zIndex: "0",
    },
    decoration2: {
      position: "absolute",
      width: "200px",
      height: "200px",
      borderRadius: "50%",
      background: "linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(29, 78, 216, 0.03) 100%)",
      bottom: "10%",
      left: "10%",
      zIndex: "0",
    },
    logo: {
      textAlign: "center",
      marginBottom: "10px",
      fontSize: "24px",
      fontWeight: "bold",
      color: "#1a56db",
    },
    passwordHint: {
      fontSize: "12px",
      color: "#94a3b8",
      marginLeft: "5px",
      marginTop: "2px",
    },
    successMessage: {
      backgroundColor: "#d1fae5",
      color: "#065f46",
      padding: "12px",
      borderRadius: "8px",
      marginBottom: "20px",
      textAlign: "center",
      fontSize: "14px",
      display: "none", // Hidden by default
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
        <div style={styles.logo}>🚀 SecureApp</div>
        <h2 style={styles.title}>Create Account</h2>
        <p style={styles.subtitle}>Join our community today</p>
        
        <form 
          style={styles.form} 
          onSubmit={handleSubmit}
        >
          <div style={styles.inputGroup}>
            <label style={styles.label}>Full Name *</label>
            <input
              name="fullname"
              type="text"
              placeholder="Enter your full name"
              value={form.fullname}
              onChange={handleChange}
              required
              style={{
                ...styles.input,
                ...(errors.fullname ? styles.inputError : {})
              }}
              onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
              onBlur={(e) => {
                e.target.style.borderColor = errors.fullname ? "#ef4444" : "#e0f2fe";
                e.target.style.boxShadow = "none";
                e.target.style.backgroundColor = errors.fullname ? "#fef2f2" : "#f8fafc";
              }}
            />
            <div style={styles.errorText}>{errors.fullname}</div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address *</label>
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
              style={{
                ...styles.input,
                ...(errors.email ? styles.inputError : {})
              }}
              onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
              onBlur={(e) => {
                e.target.style.borderColor = errors.email ? "#ef4444" : "#e0f2fe";
                e.target.style.boxShadow = "none";
                e.target.style.backgroundColor = errors.email ? "#fef2f2" : "#f8fafc";
              }}
            />
            <div style={styles.errorText}>{errors.email}</div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password *</label>
            <input
              name="password"
              type="password"
              placeholder="Create a strong password"
              value={form.password}
              onChange={handleChange}
              required
              style={{
                ...styles.input,
                ...(errors.password ? styles.inputError : {})
              }}
              onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
              onBlur={(e) => {
                e.target.style.borderColor = errors.password ? "#ef4444" : "#e0f2fe";
                e.target.style.boxShadow = "none";
                e.target.style.backgroundColor = errors.password ? "#fef2f2" : "#f8fafc";
              }}
            />
            <div style={styles.passwordHint}>Minimum 6 characters</div>
            <div style={styles.errorText}>{errors.password}</div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Confirm Password *</label>
            <input
              name="confirmPassword"
              type="password"
              placeholder="Re-enter your password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              style={{
                ...styles.input,
                ...(errors.confirmPassword ? styles.inputError : {})
              }}
              onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
              onBlur={(e) => {
                e.target.style.borderColor = errors.confirmPassword ? "#ef4444" : "#e0f2fe";
                e.target.style.boxShadow = "none";
                e.target.style.backgroundColor = errors.confirmPassword ? "#fef2f2" : "#f8fafc";
              }}
            />
            <div style={styles.errorText}>{errors.confirmPassword}</div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            style={styles.button}
            onMouseEnter={(e) => {
              if (!loading) Object.assign(e.target.style, styles.buttonHover);
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "none";
                e.target.style.background = "linear-gradient(135deg, #1a56db 0%, #3b82f6 100%)";
              }
            }}
          >
            {loading ? (
              <>
                <span style={{ marginRight: "8px" }}>⏳</span>
                Creating Account...
              </>
            ) : (
              <>
                <span style={{ marginRight: "8px" }}>📝</span>
                Sign Up Now
              </>
            )}
          </button>
        </form>
        
        <div style={styles.loginLink}>
          Already have an account?
          <Link to="/user/login" style={styles.link}> Login here</Link>
        </div>
        
        <div style={{ 
          marginTop: "20px", 
          fontSize: "12px", 
          color: "#94a3b8", 
          textAlign: "center" 
        }}>
          By signing up, you agree to our Terms & Privacy Policy
        </div>
      </div>
    </div>
  );
}