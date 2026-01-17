import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function HobbySection({ data, setData, onNext, onBack }) {
  const API_URL = "http://localhost:5000/api/hobbies";

  const emptyForm = () => ({
    hobby_name: "",
  });

  const [hobbies, setHobbies] = useState([]);
  const [formData, setFormData] = useState(emptyForm());
  const [fieldErrors, setFieldErrors] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const isLoggedIn = !!data.token;

  const syncParent = (updated) => {
    setData({ ...data, hobbies: updated });
  };

  const saveToLocalStorage = (updated) => {
    localStorage.setItem("resumeHobbies", JSON.stringify(updated));
  };

  const fetchHobbiesFromDB = async () => {
    try {
      const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${data.token}` },
      });
      setHobbies(res.data);
      syncParent(res.data);
    } catch (err) {
      console.error("Failed to fetch hobbies:", err);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchHobbiesFromDB();
    } else {
      const stored = localStorage.getItem("resumeHobbies");
      if (stored) {
        const parsed = JSON.parse(stored);
        setHobbies(parsed);
        syncParent(parsed);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (fieldErrors[name]) {
      setFieldErrors({ ...fieldErrors, [name]: "" });
    }
  };

  const validate = () => {
    let errors = {};
    if (!formData.hobby_name) errors.hobby_name = "Hobby name is required.";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const saveHobby = async () => {
    if (!validate()) return;

    setLoading(true);
    const payload = {
      hobby_name: formData.hobby_name,
    };

    try {
      if (isLoggedIn) {
        if (editingId) {
          await axios.put(`${API_URL}/${editingId}`, payload, {
            headers: { Authorization: `Bearer ${data.token}` },
          });
        } else {
          await axios.post(API_URL, payload, {
            headers: { Authorization: `Bearer ${data.token}` },
          });
        }
        await fetchHobbiesFromDB();
      } else {
        const updated = editingId
          ? hobbies.map((h) => (h.id === editingId ? { ...h, ...formData } : h))
          : [{ id: Date.now() + Math.random(), ...formData }, ...hobbies];

        setHobbies(updated);
        syncParent(updated);
        saveToLocalStorage(updated);
      }

      setEditingId(null);
      setFormData(emptyForm());
      setFieldErrors({});
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Could not save hobby.",
      });
    } finally {
      setLoading(false);
    }
  };

  const removeHobby = async (id) => {
    const result = await Swal.fire({
      title: "Delete this hobby?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it"
    });

    if (!result.isConfirmed) return;

    try {
      if (isLoggedIn) {
        await axios.delete(`${API_URL}/${id}`, {
          headers: { Authorization: `Bearer ${data.token}` },
        });
        await fetchHobbiesFromDB();
      } else {
        const updated = hobbies.filter((h) => h.id !== id);
        setHobbies(updated);
        syncParent(updated);
        saveToLocalStorage(updated);
      }
    } catch (err) {
      Swal.fire("Error", "Could not delete entry", "error");
    }
  };

  const s = {
    container: { padding: 20, background: "#fff", maxWidth: "600px" },
    label: { fontSize: 13, fontWeight: "bold", display: "block", marginBottom: 5 },
    input: { width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "5px", marginBottom: "5px", boxSizing: "border-box" },
    errorText: { color: "red", fontSize: "11px", display: "block", marginBottom: "10px" },
    summaryCard: { border: "1px solid #e5e7eb", borderRadius: "8px", padding: "15px", marginTop: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" },
    buttonGroup: { display: "flex", gap: "10px", marginTop: "20px" },
    primaryButton: { padding: "10px 20px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" },
    secondaryButton: { padding: "10px 20px", background: "#f3f4f6", color: "#374151", border: "none", borderRadius: "5px", cursor: "pointer" },
  };

  return (
    <div style={s.container}>
      <h2 style={{ color: "#2563eb" }}>Hobbies</h2>
      <p style={{ color: "#666", fontSize: 13 }}>Add activities you enjoy outside of work</p>

      {/* Summary List */}
      <div style={{ marginBottom: 30 }}>
        {hobbies.map((h) => (
          editingId === h.id ? null : (
            <div key={h.id} style={s.summaryCard}>
              <div>
                <strong>{h.hobby_name}</strong>
              </div>
              <div>
                <button onClick={() => { setEditingId(h.id); setFormData(h); }} style={{ ...s.secondaryButton, marginRight: 10 }}>Edit</button>
                <button onClick={() => removeHobby(h.id)} style={{ ...s.secondaryButton, color: "red" }}>Delete</button>
              </div>
            </div>
          )
        ))}
      </div>

      {/* Entry Form */}
      <div style={{ marginBottom: 30, padding: 20, border: "1px solid #e5e7eb", borderRadius: 8, background: "#f9fafb" }}>
        <h3 style={{ marginTop: 0, marginBottom: 20 }}>{editingId ? "Edit Hobby" : "Add New Hobby"}</h3>
        
        <label style={s.label}>Hobby / Interest</label>
        <input 
            name="hobby_name" 
            value={formData.hobby_name} 
            onChange={handleChange} 
            style={s.input} 
            placeholder="e.g. Photography, Chess, Hiking" 
        />
        {fieldErrors.hobby_name && <span style={s.errorText}>{fieldErrors.hobby_name}</span>}

        <div style={s.buttonGroup}>
          <button onClick={saveHobby} style={s.primaryButton} disabled={loading}>
            {editingId ? "Update Hobby" : "+ Add Hobby"}
          </button>
          {editingId && (
            <button onClick={() => { setEditingId(null); setFormData(emptyForm()); }} style={s.secondaryButton}>Cancel</button>
          )}
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 40 }}>
        <button onClick={onBack} style={s.secondaryButton}>Back</button>
        <button onClick={onNext} style={s.primaryButton}>Finish →</button>
      </div>
    </div>
  );
}