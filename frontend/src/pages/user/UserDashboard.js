import { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import axios from "axios";

export default function UserDashboard() {
  const [userData, setUserData] = useState({
    name: "Guest User",
    status: "Guest",
  });
  const [loading, setLoading] = useState(true);

  const title = "User Dashboard"; // Updated to match "Admin Dashboard" style

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    window.location.href = "/login";
  };

  useEffect(() => {
    const token = localStorage.getItem("userToken");

    if (token) {
      axios
        .get("/api/user/dashboard", {
          headers: { Authorization: "Bearer " + token },
        })
        .then((res) => setUserData(res.data))
        .catch(() => handleLogout());
    } else {
      const guestData = localStorage.getItem("guestData");
      if (guestData) {
        setUserData(JSON.parse(guestData));
      }
    }

    setLoading(false);
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f4f7f9" }}>
      
      {/* SIDEBAR - Dark Gray */}
      <aside
        style={{
          width: "250px",
          backgroundColor: "#212529",
          color: "white",
          padding: 20,
          flexShrink: 0,
        }}
      >
        <h2 style={{ fontSize: "1.5rem", marginBottom: "30px", opacity: 0.8 }}>USER AREA</h2>
        <nav>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li>
              <Link to="profile" style={linkStyle}>Dashboard</Link>
            </li>
            <li>
              <Link to="resume/template-select" style={linkStyle}>My Resume</Link>
            </li>
            <li>
              <Link to="coverletter" style={linkStyle}>Cover Letter</Link>
            </li>
            <li>
              <Link to="setting" style={linkStyle}>Settings</Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* RIGHT SIDE WRAPPER */}
      <div style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        
        {/* HEADER - White Background with Logout Button */}
        <header
          style={{
            height: "60px",
            backgroundColor: "#fff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 30px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
            borderBottom: "1px solid #e9ecef"
          }}
        >
          <h2 style={{ margin: 0, fontSize: "1.25rem", fontWeight: "bold" }}>{title}</h2>
          <button
            onClick={handleLogout}
            style={{
              padding: "6px 15px",
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            Logout
          </button>
        </header>

        {/* MAIN CONTENT AREA - Gray Background */}
        <main style={{ flexGrow: 1, padding: 30 }}>
          <div style={{ marginTop: "30px" }}>
            <Outlet />
          </div>
        </main>
      </div>

    </div>
  );
}

const linkStyle = {
  display: "block",
  color: "#ced4da",
  textDecoration: "none",
  padding: "12px 15px",
  borderRadius: "4px",
  marginBottom: "5px",
  transition: "all 0.3s",
};

// For hover effect, you might want to move linkStyle to a CSS file, 
// but for this standalone code, it matches the sidebar design.