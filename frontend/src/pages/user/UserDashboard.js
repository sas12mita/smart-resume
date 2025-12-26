import { useEffect, useState } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function UserDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const [userData, setUserData] = useState({
    name: "Guest User",
    status: "Guest",
  });

  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("userToken");
  const isLoggedIn = !!token;

  const title = "Dashboard";

  // 🔴 LOGOUT (manual only)
  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("user");
    setUserData({ name: "Guest User", status: "Guest" });
  };

  // 🔵 LOGIN
  const handleLogin = () => {
    navigate("/user/login");
  };

  useEffect(() => {
    const loadUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get("/api/user/dashboard", {
          headers: { Authorization: "Bearer " + token },
        });
        setUserData(res.data);
      } catch {
        localStorage.removeItem("userToken");
        setUserData({ name: "Guest User", status: "Guest" });
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  if (loading) return <p style={{ padding: 20 }}>Loading...</p>;

  // 🔵 Active menu checker
  const isDashboardActive =
    location.pathname === "/user" || location.pathname === "/user/";

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
        <h2 style={{ fontSize: "1.5rem", marginBottom: "30px", opacity: 0.8 }}>
          USER AREA
        </h2>

        <nav>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {/* DASHBOARD (ACTIVE) */}
            <li>
              <Link
                to="/user/dashboard"
                style={{
                  ...linkStyle,
                  ...(isDashboardActive ? activeLinkStyle : {})
                }}
              >
                Dashboard
              </Link>
            </li>

            <li>
              <Link to="resume/template-select" style={linkStyle}>
                My Resume
              </Link>
            </li>

            <li>
              <Link to="coverletter" style={linkStyle}>
                Cover Letter
              </Link>
            </li>

            <li>
              <Link to="setting" style={linkStyle}>
                Settings
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* RIGHT SIDE */}
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
          <h2 style={{ margin: 0, fontSize: "1.25rem", fontWeight: "bold" }}>
            {title}
          </h2>

          {isLoggedIn ? (
            <button onClick={handleLogout} style={logoutBtn}>
              Logout
            </button>
          ) : (
            <button onClick={handleLogin} style={loginBtn}>
              Login
            </button>
          )}
        </header>

        {/* MAIN CONTENT */}
        <main style={{ flexGrow: 1, padding: 30 }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

/* ---------- STYLES ---------- */

const linkStyle = {
  display: "block",
  color: "#ced4da",
  textDecoration: "none",
  padding: "12px 15px",
  borderRadius: "4px",
  marginBottom: "5px",
};

const activeLinkStyle = {
  backgroundColor: "#0d6efd",
  color: "#fff",
  fontWeight: "bold",
};

const loginBtn = {
  padding: "6px 18px",
  backgroundColor: "#0d6efd",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontWeight: "bold",
};

const logoutBtn = {
  padding: "6px 18px",
  backgroundColor: "#dc3545",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontWeight: "bold",
};
