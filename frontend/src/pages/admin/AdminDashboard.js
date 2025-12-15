// AdminDashboard.jsx (Standalone with Layout and Styles)

import { useEffect, useState } from "react";
import axios from "axios";

const layoutStyles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#f4f7f9", // Light background for content
  },
  sidebar: {
    width: "250px",
    backgroundColor: "#212529", // Black/Dark background
    color: "white",
    padding: "20px 0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  sidebarItem: {
    width: "80%",
    padding: "10px",
    margin: "5px 0",
    borderRadius: "5px",
    cursor: "pointer",
    textAlign: "center",
    transition: "background-color 0.2s",
  },
  mainContent: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
  },
  header: {
    backgroundColor: "white",
    padding: "15px 30px",
    borderBottom: "1px solid #e9ecef",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  contentArea: {
    padding: "30px",
    flexGrow: 1,
  },
};

// Admin navigation items
const adminNavItems = [
  { name: "Dashboard", link: "/admin" },
  { name: "Users", link: "/admin/users" },
  { name: "Settings", link: "/admin/settings" }
];

export default function AdminDashboard() {
  const [msg, setMsg] = useState("Loading protected admin data...");
  const title = "Admin Dashboard";

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin/login";
  };

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    const API_URL = process.env.REACT_APP_API_URL;
    axios.get(`${API_URL}/api/admin/dashboard`, {
        headers: { Authorization: "Bearer " + token }
      })
      .then((res) => setMsg(res.data.msg))
      .catch(() => handleLogout()); // Redirect on authentication failure
  }, []);

  return (
    <div style={layoutStyles.container}>
      {/* 1. Black Sidebar */}
      <div style={layoutStyles.sidebar}>
        <h2 style={{ marginBottom: "30px", color: "#6c757d" }}>ADMIN PANEL</h2>
        <div style={{ width: '100%' }}>
          {adminNavItems.map((item) => (
            <div
              key={item.name}
              style={{
                ...layoutStyles.sidebarItem,
                backgroundColor: window.location.pathname.includes(item.link) ? '#495057' : 'transparent'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#343a40'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = window.location.pathname.includes(item.link) ? '#495057' : 'transparent'}
              onClick={() => (window.location.href = item.link)}
            >
              {item.name}
            </div>
          ))}
        </div>
      </div>

      {/* 2. Main Content Area */}
      <div style={layoutStyles.mainContent}>
        {/* Header */}
        <div style={layoutStyles.header}>
          <h1 style={{ margin: 0, fontSize: "1.5rem" }}>{title}</h1>
          <button
            onClick={handleLogout}
            style={{
              padding: "8px 15px",
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>

        {/* Content Area */}
        <div style={layoutStyles.contentArea}>
          <h2>Administrative Overview</h2>
          <p>This area is secured by JWT verification in the middleware.</p>
          <div style={{ padding: '20px', border: '1px solid #ccc', backgroundColor: 'white', marginTop: '20px' }}>
            API Response Message: <strong>{msg}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}