import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function BioSection({ data, setData, onNext, onBack }) {
  const bio = data.bio || {};
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // CHECK IF LOGGED IN
  const isLoggedIn = true;
  console.log(isLoggedIn)

  /* =============================
      LOAD BIO (GUEST / USER)
  ============================== */
  useEffect(() => {
    if (!isLoggedIn) {
      console.log("Loading guest data from localStorage");
      const savedBio = localStorage.getItem("bioData");
      if (savedBio) {
        setData((prev) => ({ ...prev, bio: JSON.parse(savedBio) }));
      }
    } else {
      const fetchBio = async () => {
        try {
          const API_URL = process.env.REACT_APP_API_URL;
          const res = await axios.get(`${API_URL}/api/bio`, {
            headers: {
              Authorization: `Bearer ${data.token}`,
            },
          });

          if (res.data) {
            setData((prev) => ({ ...prev, bio: res.data }));
          }
        } catch (err) {
          console.log("Fetch Bio Error:", err);
        }
      };
      fetchBio();
    }
  }, [isLoggedIn, data.token, setData]);

  /* =============================
      IMAGE UPLOAD (LOCAL ONLY)
  ============================== */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setData({
        ...data,
        bio: { ...bio, photo: reader.result },
      });
    };
    reader.readAsDataURL(file);
  };

  /* =============================
      INPUT CHANGE
  ============================== */
  const handleChange = (e) => {
    setData({
      ...data,
      bio: { ...bio, [e.target.name]: e.target.value },
    });
  };

  /* =============================
      AI SUMMARY
  ============================== */
  const generateSummary = async () => {
    if (!bio.designation) {
      Swal.fire({
        icon: "warning",
        title: "Designation Required",
        text: "Please enter your designation first.",
        confirmButtonColor: "#2563eb",
      });
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const API_URL = process.env.REACT_APP_API_URL;
      const res = await axios.post(`${API_URL}/api/generate-summary`, {
        designation: bio.designation,
      });

      setData({
        ...data,
        bio: { ...bio, summary: res.data.summary },
      });
    } catch (err) {
      setErrorMsg(err.response?.data?.error || "AI busy. Please try again.");
    }

    setLoading(false);
  };

  /* =============================
      SAVE & CONTINUE
  ============================== */
  const handleNext = async () => {
    const API_URL = process.env.REACT_APP_API_URL;

    if (!isLoggedIn) {
      // Guest → localStorage
      localStorage.setItem("bioData", JSON.stringify(bio));
      onNext();
      return;
    }

    // Logged-in → backend
    try {
      console.log("Attempting to save to backend...");
      await axios.post(
        `${API_URL}/api/bio`,
        {
          fullname: bio.fullname,
          email: bio.email,
          designation: bio.designation,
          phone: bio.phone,
          address: bio.address,
          summary: bio.summary,
        },
        {
          headers: {
            // FIXED: Changed 'token' to 'data.token'
            Authorization: `Bearer ${data.token}`,
          },
        }
      );

      onNext();
    } catch (err) {
      console.error("Save Bio Error:", err);
      Swal.fire(
        "Error",
        err.response?.data?.error || "Failed to save bio",
        "error"
      );
    }
  };

  /* =============================
      STYLES
  ============================== */
  const s = {
    container: { padding: "20px", backgroundColor: "#fff" },
    title: { color: "#2196f3", fontSize: "28px", fontWeight: "bold" },
    subtitle: { color: "#666", fontSize: "13px", marginBottom: "25px" },
    photoRow: { display: "flex", gap: "15px", marginBottom: "25px" },
    photoCircle: {
      width: "80px",
      height: "80px",
      borderRadius: "50%",
      border: "1px solid #e5e7eb",
      backgroundImage: `url(${bio.photo || ""})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    uploadBtn: {
      background: "none",
      border: "none",
      color: "#2196f3",
      cursor: "pointer",
      fontWeight: "500",
    },
    grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" },
    fullWidth: { gridColumn: "span 2" },
    label: { fontSize: "12px", fontWeight: "600", marginBottom: "6px" },
    input: {
      width: "100%",
      padding: "12px",
      border: "1px solid #d1d5db",
      borderRadius: "4px",
    },
    textarea: {
      width: "100%",
      minHeight: "120px",
      padding: "12px",
      border: "1px solid #d1d5db",
      borderRadius: "4px",
    },
    footer: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: "30px",
    },
    btnBack: { padding: "10px 25px", border: "1px solid #333", cursor: "pointer" },
    btnNext: {
      padding: "10px 30px",
      background: "#2196f3",
      color: "#fff",
      border: "none",
      cursor: "pointer"
    },
  };

  return (
    <div style={s.container}>
      <h1 style={s.title}>About Yourself</h1>
      <p style={s.subtitle}>Fill out your primary information.</p>

      <div style={s.photoRow}>
        <div style={s.photoCircle}>{!bio.photo && "👤"}</div>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          accept="image/*"
          onChange={handleImageChange}
        />
        <button style={s.uploadBtn} onClick={() => fileInputRef.current.click()}>
          ↑ Upload Photo
        </button>
      </div>

      <div style={s.grid}>
        <div>
          <label style={s.label}>Full Name</label>
          <input
            name="fullname"
            style={s.input}
            value={bio.fullname || ""}
            onChange={handleChange}
          />
        </div>

        <div>
          <label style={s.label}>Email</label>
          <input
            name="email"
            style={s.input}
            value={bio.email || ""}
            onChange={handleChange}
          />
        </div>

        <div style={s.fullWidth}>
          <label style={s.label}>Designation</label>
          <input
            name="designation"
            style={s.input}
            value={bio.designation || ""}
            onChange={handleChange}
          />
        </div>

        <div>
          <label style={s.label}>Phone</label>
          <input
            name="phone"
            style={s.input}
            value={bio.phone || ""}
            onChange={handleChange}
          />
        </div>

        <div>
          <label style={s.label}>Address</label>
          <input
            name="address"
            style={s.input}
            value={bio.address || ""}
            onChange={handleChange}
          />
        </div>

        <div style={s.fullWidth}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
            <label style={s.label}>Summary</label>
            <button
              onClick={generateSummary}
              disabled={loading}
              style={{
                background: "#2563eb",
                color: "#fff",
                border: "none",
                padding: "6px 12px",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "14px"
              }}
            >
              {loading ? "Generating..." : "Generate with AI"}
            </button>
          </div>

          <textarea
            name="summary"
            style={s.textarea}
            value={bio.summary || ""}
            onChange={handleChange}
          />
        </div>
      </div>

      {errorMsg && (
        <p style={{ color: "#dc2626", fontSize: "12px" }}>{errorMsg}</p>
      )}

      <div style={s.footer}>
        <button style={s.btnBack} onClick={onBack}>
          Back
        </button>
        <button style={s.btnNext} onClick={handleNext}>
          Continue to Education ›
        </button>
      </div>
    </div>
  );
}