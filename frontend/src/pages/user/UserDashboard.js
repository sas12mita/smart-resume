// UserDashboard.jsx (Standalone with Layout and Styles)

import { useEffect, useState } from "react";
import axios from "axios";

// Styles are repeated here as requested
const layoutStyles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#f4f7f9", 
  },
  sidebar: {
    width: "250px",
    backgroundColor: "#212529", 
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

// User navigation items
const userNavItems = [
    { name: "My Profile", link: "/user/profile" }, 
    { name: "Orders", link: "/user/orders" }
];

export default function UserDashboard() {
  const [userData, setUserData] = useState({ name: "User", status: "Basic" }); 
  const title = "My User Portal";

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    window.location.href = "/login";
  };

  useEffect(() => {
    const token = localStorage.getItem("userToken");

    axios
      .get("/api/user/dashboard", {
        headers: { Authorization: "Bearer " + token }
      })
      .then((res) => setUserData(res.data))
      .catch(() => handleLogout()); // Redirect on failed authentication
  }, []);

  return (
    <div style={layoutStyles.container}>
      {/* 1. Black Sidebar */}
      <div style={layoutStyles.sidebar}>
        <h2 style={{ marginBottom: "30px", color: "#6c757d" }}>USER AREA</h2>
        <div style={{ width: '100%' }}>
          {userNavItems.map((item) => (
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
          <h2>Welcome Back, {userData.name}!</h2>
          <p>Here you can manage your personal profile and account details.</p>
          <div style={{ padding: '20px', border: '1px solid #ccc', backgroundColor: 'white', marginTop: '20px' }}>
            <h3>Account Details</h3>
            <p>Current Tier: <strong>{userData.status}</strong></p>
            <p>Last Login: Today</p>
          </div>
        </div>
      </div>
    </div>
  );
}