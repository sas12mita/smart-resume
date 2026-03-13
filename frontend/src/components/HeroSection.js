import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [displayedHighlight, setDisplayedHighlight] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const highlightText = "next career";

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Single-run typing animation for "next career"
  useEffect(() => {
    if (!isVisible) return;

    let index = 0;

    const typingInterval = setInterval(() => {
      if (index < highlightText.length) {
        setDisplayedHighlight(highlightText.slice(0, index + 1));
        index++;
      } else {
        setIsTypingComplete(true);
        clearInterval(typingInterval);
      }
    }, 80); // Typing speed

    return () => clearInterval(typingInterval);
  }, [isVisible]);

  const goToDashboard = () => {
    navigate("/user/dashboard");
  };

  return (
    <div style={styles.container}>
      {/* Animated Background Elements */}
      <div style={styles.backgroundElements}>
        <div style={{ ...styles.floatingShape, ...styles.shape1 }}></div>
        <div style={{ ...styles.floatingShape, ...styles.shape2 }}></div>
        <div style={{ ...styles.floatingShape, ...styles.shape3 }}></div>
        <div style={{ ...styles.gradientOrb, ...styles.orb1 }}></div>
        <div style={{ ...styles.gradientOrb, ...styles.orb2 }}></div>
      </div>

      {/* Main Content */}
      <div style={styles.contentWrapper}>
        {/* Animated Heading with Typing Effect */}
        <div
          style={{
            ...styles.headingContainer,
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          <h1 style={styles.heading}>
            Elevate the search <br /> for your{" "}
            <span style={styles.highlight}>
              {displayedHighlight}
              <span
                style={{
                  ...styles.cursor,
                  opacity: !isTypingComplete ? 1 : 0,
                }}
              >
                |
              </span>
            </span>
          </h1>
        </div>

        {/* Animated Description */}
        <div
          style={{
            ...styles.textContainer,
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s",
          }}
        >
          <p style={styles.text}>
            Our tools support you every step of the way—from creating a resume
            and cover letters to job listings and keeping track of your
            applications.
          </p>
        </div>

        {/* Animated Button */}
        <div
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.4s",
          }}
        >
          <button style={styles.button} onClick={goToDashboard}>
            <span style={styles.buttonText}>Finds Jobs</span>
            <span style={styles.buttonIcon}>→</span>
          </button>
        </div>

        {/* Animated Stats Section */}
        <div
          style={{
            ...styles.statsContainer,
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.6s",
          }}
        >
          <div style={styles.stat}>
            <div style={styles.statNumber}>10K+</div>
            <div style={styles.statLabel}>Job Listings</div>
          </div>
          <div style={styles.stat}>
            <div style={styles.statNumber}>5K+</div>
            <div style={styles.statLabel}>Active Users</div>
          </div>
          <div style={styles.stat}>
            <div style={styles.statNumber}>98%</div>
            <div style={styles.statLabel}>Success Rate</div>
          </div>
        </div>
      </div>

      {/* Animated Scroll Indicator */}
      <div style={styles.scrollIndicator}>
        <div style={styles.scrollDot}></div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.1);
          }
        }

        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(90, 0, 255, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(90, 0, 255, 0.6);
          }
        }

        @keyframes scroll {
          0%, 100% {
            transform: translateY(0);
            opacity: 1;
          }
          50% {
            transform: translateY(10px);
            opacity: 0.5;
          }
        }

        @keyframes blink {
          0%, 49% {
            opacity: 1;
          }
          50%, 100% {
            opacity: 0;
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @media (max-width: 768px) {
          @keyframes float {
            0%, 100% {
              transform: translateY(0px) rotate(0deg);
            }
            50% {
              transform: translateY(-10px) rotate(3deg);
            }
          }
        }
      `}</style>
    </div>
  );
};

const styles = {
  container: {
    position: "relative",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    background: "linear-gradient(135deg, #ffffff 0%, #f5f0ff 50%, #fff8f5 100%)",
    padding: "20px",
  },

  backgroundElements: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    zIndex: 0,
    pointerEvents: "none",
  },

  floatingShape: {
    position: "absolute",
    borderRadius: "50%",
    opacity: 0.1,
    animation: "float 6s ease-in-out infinite",
  },

  shape1: {
    width: "300px",
    height: "300px",
    background: "#5a00ff",
    top: "-100px",
    left: "-100px",
    animationDelay: "0s",
  },

  shape2: {
    width: "200px",
    height: "200px",
    background: "#ff6b6b",
    bottom: "-50px",
    right: "-50px",
    animationDelay: "2s",
  },

  shape3: {
    width: "150px",
    height: "150px",
    background: "#4ecdc4",
    top: "50%",
    right: "10%",
    animationDelay: "4s",
  },

  gradientOrb: {
    position: "absolute",
    borderRadius: "50%",
    filter: "blur(40px)",
    animation: "pulse 4s ease-in-out infinite",
  },

  orb1: {
    width: "400px",
    height: "400px",
    background: "radial-gradient(circle, rgba(90, 0, 255, 0.3) 0%, transparent 70%)",
    top: "-200px",
    right: "-200px",
    animationDelay: "0s",
  },

  orb2: {
    width: "300px",
    height: "300px",
    background: "radial-gradient(circle, rgba(255, 107, 107, 0.2) 0%, transparent 70%)",
    bottom: "-150px",
    left: "-150px",
    animationDelay: "1s",
  },

  contentWrapper: {
    position: "relative",
    zIndex: 10,
    textAlign: "center",
    maxWidth: "900px",
    width: "100%",
  },

  headingContainer: {
    marginBottom: "30px",
  },

  heading: {
    fontSize: "clamp(32px, 8vw, 72px)",
    fontWeight: "700",
    lineHeight: "1.2",
    color: "#1a1a1a",
    margin: "0 0 20px 0",
    letterSpacing: "-1px",
  },

  highlight: {
    background: "linear-gradient(135deg, #5a00ff 0%, #8b5cf6 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    position: "relative",
    display: "inline-block",
    minWidth: "200px",
    textAlign: "center",
  },

  cursor: {
    display: "inline-block",
    marginLeft: "4px",
    animation: "blink 1s infinite",
    color: "#5a00ff",
    fontWeight: "bold",
    transition: "opacity 0.3s ease",
  },

  textContainer: {
    marginBottom: "40px",
  },

  text: {
    fontSize: "clamp(16px, 2.5vw, 20px)",
    maxWidth: "600px",
    margin: "0 auto",
    lineHeight: "1.8",
    color: "#666",
    fontWeight: "400",
    letterSpacing: "0.3px",
  },

  button: {
    marginTop: "30px",
    padding: "16px 40px",
    background: "linear-gradient(135deg, #5a00ff 0%, #8b5cf6 100%)",
    color: "white",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "18px",
    fontWeight: "600",
    display: "inline-flex",
    alignItems: "center",
    gap: "12px",
    transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
    boxShadow: "0 10px 30px rgba(90, 0, 255, 0.2)",
    position: "relative",
    overflow: "hidden",
  },

  buttonText: {
    position: "relative",
    zIndex: 2,
  },

  buttonIcon: {
    position: "relative",
    zIndex: 2,
    transition: "transform 0.3s ease",
    display: "inline-block",
  },

  statsContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "40px",
    marginTop: "60px",
    flexWrap: "wrap",
  },

  stat: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px",
  },

  statNumber: {
    fontSize: "clamp(24px, 5vw, 36px)",
    fontWeight: "700",
    background: "linear-gradient(135deg, #5a00ff 0%, #8b5cf6 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },

  statLabel: {
    fontSize: "14px",
    color: "#999",
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },

  scrollIndicator: {
    position: "absolute",
    bottom: "30px",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 10,
  },

  scrollDot: {
    width: "8px",
    height: "8px",
    background: "#5a00ff",
    borderRadius: "50%",
    animation: "scroll 2s ease-in-out infinite",
  },
};

export default HeroSection;