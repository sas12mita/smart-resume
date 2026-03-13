import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const goToDashboard = () => {
    navigate("/user/dashboard");
  };

  return (
    <nav style={styles.nav}>
      {/* Logo Section */}
      <div style={styles.logoContainer}>
        <h2 style={styles.logo}>
          <span style={styles.logoIcon}>💼</span>
          Jobseeker
        </h2>
      </div>

      {/* Button Section */}
      <div style={styles.buttonContainer}>
        <button
          style={styles.btn}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          Log in
        </button>
        <button style={styles.start} onClick={goToDashboard}>
          <span style={styles.buttonContent}>Get Started</span>
          <span style={styles.buttonArrow}>→</span>
        </button>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes hoverGlow {
          0%, 100% {
            box-shadow: 0 4px 15px rgba(90, 0, 255, 0.1);
          }
          50% {
            box-shadow: 0 4px 25px rgba(90, 0, 255, 0.2);
          }
        }

        nav {
          animation: slideDown 0.6s ease-out;
        }

        @media (max-width: 768px) {
          nav {
            padding: 16px 20px !important;
          }

          h2 {
            font-size: 18px !important;
          }

          button {
            padding: 8px 12px !important;
            font-size: 14px !important;
          }
        }

        @media (max-width: 480px) {
          nav {
            flex-direction: column;
            gap: 16px;
          }

          div:last-child {
            width: 100%;
            display: flex;
            gap: 10px;
          }

          button {
            flex: 1;
          }
        }
      `}</style>
    </nav>
  );
};

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 40px",
    background: "linear-gradient(135deg, #ffffff 0%, #f5f0ff 50%, #fff8f5 100%)",
    borderBottom: "1px solid rgba(90, 0, 255, 0.1)",
    backdropFilter: "blur(10px)",
    position: "sticky",
    top: 0,
    zIndex: 100,
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
  },

  logoContainer: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },

  logo: {
    margin: 0,
    fontSize: "22px",
    fontWeight: "700",
    color: "#1a1a1a",
    background: "linear-gradient(135deg, #5a00ff 0%, #8b5cf6 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    letterSpacing: "-0.5px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },

  logoIcon: {
    fontSize: "24px",
    marginRight: "4px",
  },

  buttonContainer: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
  },

  btn: {
    marginRight: 0,
    padding: "10px 20px",
    border: "2px solid #5a00ff",
    background: "transparent",
    color: "#5a00ff",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
    transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
    position: "relative",
    overflow: "hidden",
  },

  start: {
    padding: "10px 24px",
    background: "linear-gradient(135deg, #5a00ff 0%, #8b5cf6 100%)",
    color: "white",
    borderRadius: "8px",
    cursor: "pointer",
    border: "none",
    fontSize: "16px",
    fontWeight: "600",
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
    boxShadow: "0 4px 15px rgba(90, 0, 255, 0.2)",
    position: "relative",
    overflow: "hidden",
  },

  buttonContent: {
    position: "relative",
    zIndex: 2,
  },

  buttonArrow: {
    position: "relative",
    zIndex: 2,
    transition: "transform 0.3s ease",
    display: "inline-block",
  },
};

// Add hover effects dynamically
const navStyle = document.createElement("style");
navStyle.textContent = `
  button[style*="border: 2px solid"] {
    position: relative;
  }

  button[style*="border: 2px solid"]::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #5a00ff 0%, #8b5cf6 100%);
    transition: left 0.3s ease;
    z-index: 1;
  }

  button[style*="border: 2px solid"]:hover::before {
    left: 0;
  }

  button[style*="border: 2px solid"]:hover {
    color: white;
  }

  button[style*="background: linear-gradient"]:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 25px rgba(90, 0, 255, 0.3) !important;
  }

  button[style*="background: linear-gradient"] span:last-child:hover {
    transform: translateX(4px);
  }
`;

if (typeof document !== "undefined") {
  document.head.appendChild(navStyle);
}

export default Navbar;