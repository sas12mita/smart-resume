import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function LanguageSection({ data, setData, onNext, onBack }) {
  const API_URL = "http://localhost:5000/api/languages";

  const emptyForm = () => ({
    language_name: "",
    proficiency: "",
  });

  const [languages, setLanguages] = useState([]);
  const [formData, setFormData] = useState(emptyForm());
  const [fieldErrors, setFieldErrors] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const isLoggedIn = !!data.token;

  const syncParent = (updated) => {
    setData({ ...data, languages: updated });
  };

  const saveToLocalStorage = (updated) => {
    localStorage.setItem("resumeLanguages", JSON.stringify(updated));
  };

  const fetchLanguagesFromDB = async () => {
    try {
      const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${data.token}` },
      });
      setLanguages(res.data);
      syncParent(res.data);
    } catch (err) {
      console.error("Failed to fetch languages:", err);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchLanguagesFromDB();
    } else {
      const stored = localStorage.getItem("resumeLanguages");
      if (stored) {
        const parsed = JSON.parse(stored);
        setLanguages(parsed);
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
    if (!formData.language_name) errors.language_name = "Language name is required.";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const saveLanguage = async () => {
    if (!validate()) return;

    setLoading(true);
    const payload = {
      language_name: formData.language_name,
      proficiency: formData.proficiency,
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
        await fetchLanguagesFromDB();
      } else {
        const updated = editingId
          ? languages.map((l) => (l.id === editingId ? { ...l, ...formData } : l))
          : [{ id: Date.now() + Math.random(), ...formData }, ...languages];

        setLanguages(updated);
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
        text: "Could not save language information.",
      });
    } finally {
      setLoading(false);
    }
  };

  const removeLanguage = async (id) => {
    const result = await Swal.fire({
      title: "Delete this language?",
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
        await fetchLanguagesFromDB();
      } else {
        const updated = languages.filter((l) => l.id !== id);
        setLanguages(updated);
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
    select: { width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "5px", marginBottom: "5px", background: "#fff" },
    errorText: { color: "red", fontSize: "11px", display: "block", marginBottom: "10px" },
    summaryCard: { border: "1px solid #e5e7eb", borderRadius: "8px", padding: "15px", marginTop: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" },
    buttonGroup: { display: "flex", gap: "10px", marginTop: "20px" },
    primaryButton: { padding: "10px 20px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" },
    secondaryButton: { padding: "10px 20px", background: "#f3f4f6", color: "#374151", border: "none", borderRadius: "5px", cursor: "pointer" },
  };

  return (
    <div style={s.container}>
      <h2 style={{ color: "#2563eb" }}>Languages</h2>
      <p style={{ color: "#666", fontSize: 13 }}>List languages you speak and your proficiency level</p>

      {/* Summary List */}
      <div style={{ marginBottom: 30 }}>
        {languages.map((lang) => (
          editingId === lang.id ? null : (
            <div key={lang.id} style={s.summaryCard}>
              <div>
                <strong style={{ display: "block" }}>{lang.language_name}</strong>
                <span style={{ fontSize: 12, color: "#666" }}>Proficiency: {lang.proficiency || "Not specified"}</span>
              </div>
              <div>
                <button onClick={() => { setEditingId(lang.id); setFormData(lang); }} style={{ ...s.secondaryButton, marginRight: 10 }}>Edit</button>
                <button onClick={() => removeLanguage(lang.id)} style={{ ...s.secondaryButton, color: "red" }}>Delete</button>
              </div>
            </div>
          )
        ))}
      </div>

      {/* Entry Form */}
      <div style={{ marginBottom: 30, padding: 20, border: "1px solid #e5e7eb", borderRadius: 8, background: "#f9fafb" }}>
        <h3 style={{ marginTop: 0, marginBottom: 20 }}>{editingId ? "Edit Language" : "Add New Language"}</h3>
        
        <label style={s.label}>Language</label>
        <input name="language_name" value={formData.language_name} onChange={handleChange} style={s.input} placeholder="e.g. English, French, Spanish" />
        {fieldErrors.language_name && <span style={s.errorText}>{fieldErrors.language_name}</span>}

        <div style={{ marginTop: 10 }}>
          <label style={s.label}>Proficiency Level</label>
          <select name="proficiency" value={formData.proficiency} onChange={handleChange} style={s.select}>
            <option value="">Select Level</option>
            <option value="Elementary">Elementary Proficiency</option>
            <option value="Limited Working">Limited Working Proficiency</option>
            <option value="Professional Working">Professional Working Proficiency</option>
            <option value="Full Professional">Full Professional Proficiency</option>
            <option value="Native / Bilingual">Native / Bilingual Proficiency</option>
          </select>
        </div>

        <div style={s.buttonGroup}>
          <button onClick={saveLanguage} style={s.primaryButton} disabled={loading}>
            {editingId ? "Update Language" : "+ Add Language"}
          </button>
          {editingId && (
            <button onClick={() => { setEditingId(null); setFormData(emptyForm()); }} style={s.secondaryButton}>Cancel</button>
          )}
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 40 }}>
        <button onClick={onBack} style={s.secondaryButton}>Back</button>
        <button onClick={onNext} style={s.primaryButton}>Continue →</button>
      </div>
    </div>
  );
}