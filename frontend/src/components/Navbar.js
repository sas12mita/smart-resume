import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const goToDashboard = () => {
    navigate("/user/dashboard");
  };

  return (
    <nav style={styles.nav}>
      <h2>Jobseeker</h2>
      <div>
        <button style={styles.btn}>Log in</button>
        <button style={styles.start} onClick={goToDashboard}>
          Get Started
        </button>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 40px",
    borderBottom: "1px solid #eee",
  },
  btn: {
    marginRight: 20,
    padding: "8px 16px",
    border: "1px solid #333",
    background: "white",
    borderRadius: 6,
    cursor: "pointer",
  },
  start: {
    padding: "8px 16px",
    background: "#5a00ff",
    color: "white",
    borderRadius: 6,
    cursor: "pointer",
    border: "none",
  },
};

export default Navbar;
