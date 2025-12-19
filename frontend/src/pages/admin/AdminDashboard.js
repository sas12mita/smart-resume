import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";

const linkStyle = {
  display: "block",
  color: "#ced4da",
  textDecoration: "none",
  padding: "12px 15px",
  borderRadius: "4px",
  marginBottom: "5px",
  transition: "all 0.3s",
};

export default function AdminDashboard() {
  const [adminData, setAdminData] = useState({
    name: "Admin User",
    status: "Admin",
  });
  const [loading, setLoading] = useState(true);
  const [showTemplateDropdown, setShowTemplateDropdown] = useState(false);

  const title = "Admin Dashboard";

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin/login";
  };

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      const API_URL = process.env.REACT_APP_API_URL || "";
      axios
        .get(`${API_URL}/api/admin/dashboard`, {
          headers: { Authorization: "Bearer " + token },
        })
        .then((res) => setAdminData(res.data))
        .catch(() => handleLogout());
    }
    setLoading(false);
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f4f7f9" }}>
      {/* SIDEBAR */}
      <aside
        style={{
          width: "250px",
          backgroundColor: "#212529",
          color: "white",
          padding: 20,
          flexShrink: 0,
        }}
      >
        <h2 style={{ fontSize: "1.5rem", marginBottom: "30px", opacity: 0.8 }}>ADMIN PANEL</h2>
        <nav>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li>
              <Link to="" style={linkStyle}>Dashboard</Link>
            </li>
            <li>
              <Link to="users" style={linkStyle}>Users</Link>
            </li>

            {/* Templates Dropdown */}
            <li>
              <div
                onClick={() => setShowTemplateDropdown(!showTemplateDropdown)}
                style={{
                  ...linkStyle,
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                Templates
                <span>{showTemplateDropdown ? "▲" : "▼"}</span>
              </div>
              {showTemplateDropdown && (
                <ul style={{ listStyle: "none", paddingLeft: "15px", marginTop: "5px" }}>
                  <li>
                    <Link to="templates/list" style={linkStyle}>Template List</Link>
                  </li>
                  <li>
                    <Link to="templates/create" style={linkStyle}>Create Template</Link>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <Link to="settings" style={linkStyle}>Settings</Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <div style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        {/* HEADER */}
        <header
          style={{
            height: "60px",
            backgroundColor: "#fff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 30px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
            borderBottom: "1px solid #e9ecef",
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
              fontWeight: "bold",
            }}
          >
            Logout
          </button>
        </header>

        {/* MAIN CONTENT AREA */}
        <main style={{ flexGrow: 1, padding: 30 }}>
            <Outlet />
      
        </main>
      </div>
    </div>
  );
}
