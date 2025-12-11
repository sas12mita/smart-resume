import { useEffect, useState } from "react";
import axios from "axios";

export default function UserDashboard() {
  const [userData, setUserData] = useState({
    name: "Guest User",
    status: "Guest",
  });
  const [loading, setLoading] = useState(true);

  const title = "My User Portal";

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    window.location.href = "/login";
  };

  useEffect(() => {
    const token = localStorage.getItem("userToken");

    if (token) {
      // Logged-in user
      axios
        .get("/api/user/dashboard", {
          headers: { Authorization: "Bearer " + token },
        })
        .then((res) => setUserData(res.data))
        .catch(() => handleLogout());
    } else {
      // Guest mode
      const guestData = localStorage.getItem("guestData");
      if (guestData) {
        setUserData(JSON.parse(guestData));
      }
      // No redirect for guest
    }

    setLoading(false);
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <div style={{ width: "250px", backgroundColor: "#212529", color: "white", padding: 20 }}>
        <h2>USER AREA</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>

      {/* Main Content */}
      <div style={{ flexGrow: 1, padding: 30 }}>
        <h1>{title}</h1>
        <h2>Welcome Back, {userData.name}!</h2>
        <p>Account Status: {userData.status}</p>
        {userData.status === "Guest" && <p>Data is saved in your browser (guest mode).</p>}
      </div>
    </div>
  );
}
