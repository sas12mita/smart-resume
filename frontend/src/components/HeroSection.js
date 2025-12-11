import React from "react";
import { useNavigate } from "react-router-dom";
const HeroSection = () => {
    const navigate = useNavigate();

  const goToDashboard = () => {
    navigate("/user/dashboard");
  }
  return (
    <div style={styles.container}>
      <h1>
        Elevate the search <br /> for your <span style={styles.highlight}>next career</span>
      </h1>
      <p style={styles.text}>
        Our tools support you every step of the way—from creating a resume and cover
        letters to job listings and keeping track of your applications.
      </p>

      <button style={styles.button} onClick={goToDashboard}>Get Started</button>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "100px 20px",
  },
  highlight: {
    color: "#5a00ff",
  },
  text: {
    fontSize: "18px",
    maxWidth: "600px",
    margin: "20px auto",
    lineHeight: "1.6",
    color: "#555",
  },
  button: {
    marginTop: 30,
    padding: "12px 28px",
    background: "#5a00ff",
    color: "white",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontSize: 18,
  },
};

export default HeroSection;
