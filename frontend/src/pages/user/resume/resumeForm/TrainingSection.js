import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function TrainingSection({ data, setData, onNext, onBack }) {
  const API_URL = "http://localhost:5000/api/training";

  const emptyForm = () => ({
    title: "",
    institution: "",
    completion_date: "",
    certificate_link: "",
  });

  const [trainings, setTrainings] = useState([]);
  const [formData, setFormData] = useState(emptyForm());
  const [fieldErrors, setFieldErrors] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const isLoggedIn = !!data.token;

  const formatForInput = (dateStr) => (dateStr ? dateStr.split("T")[0] : "");

  const fetchTrainingFromDB = async () => {
    try {
      const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${data.token}` },
      });
      const mapped = res.data.map((item) => ({
        ...item,
        completion_date: formatForInput(item.completion_date),
      }));
      setTrainings(mapped);
      setData({ ...data, training: mapped });
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    if (isLoggedIn) fetchTrainingFromDB();
    else {
      const stored = localStorage.getItem("resumeTraining");
      if (stored) {
        const parsed = JSON.parse(stored);
        setTrainings(parsed);
        setData({ ...data, training: parsed });
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (fieldErrors[name]) setFieldErrors({ ...fieldErrors, [name]: "" });
  };

  const validate = () => {
    let errors = {};
    if (!formData.title) errors.title = "Training title is required.";
    if (!formData.institution) errors.institution = "Institution is required.";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const saveTraining = async () => {
    if (!validate()) return;
    setLoading(true);
    
    try {
      if (isLoggedIn) {
        if (editingId) {
          await axios.put(`${API_URL}/${editingId}`, formData, { 
            headers: { Authorization: `Bearer ${data.token}` } 
          });
        } else {
          await axios.post(API_URL, formData, { 
            headers: { Authorization: `Bearer ${data.token}` } 
          });
        }
        await fetchTrainingFromDB();
      } else {
        const updated = editingId
          ? trainings.map((t) => (t.id === editingId ? { ...t, ...formData } : t))
          : [{ id: Date.now(), ...formData }, ...trainings];
        setTrainings(updated);
        setData({ ...data, training: updated });
        localStorage.setItem("resumeTraining", JSON.stringify(updated));
      }
      setEditingId(null);
      setFormData(emptyForm());
    } catch (err) {
      Swal.fire("Error", "Could not save training info", "error");
    } finally {
      setLoading(false);
    }
  };

  const removeTraining = async (id) => {
    const result = await Swal.fire({
      title: "Remove this training?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete it"
    });

    if (!result.isConfirmed) return;

    try {
      if (isLoggedIn) {
        await axios.delete(`${API_URL}/${id}`, {
          headers: { Authorization: `Bearer ${data.token}` },
        });
        await fetchTrainingFromDB();
      } else {
        const updated = trainings.filter((t) => t.id !== id);
        setTrainings(updated);
        setData({ ...data, training: updated });
        localStorage.setItem("resumeTraining", JSON.stringify(updated));
      }
    } catch (err) {
      Swal.fire("Error", "Failed to delete entry", "error");
    }
  };

  const s = {
    container: { padding: 20, background: "#fff", maxWidth: "700px" },
    label: { fontSize: 13, fontWeight: "bold", display: "block", marginBottom: 5 },
    input: { width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "5px", marginBottom: "5px", boxSizing: "border-box" },
    errorText: { color: "red", fontSize: "11px", display: "block", marginBottom: 10 },
    summaryCard: { border: "1px solid #e5e7eb", borderRadius: "8px", padding: "15px", marginTop: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" },
    primaryButton: { padding: "10px 20px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" },
    secondaryButton: { padding: "10px 20px", background: "#f3f4f6", color: "#374151", border: "none", borderRadius: "5px", cursor: "pointer" },
  };

  return (
    <div style={s.container}>
      <h2 style={{ color: "#2563eb" }}>Certifications & Training</h2>

      {/* List of saved trainings */}
      <div style={{ marginBottom: 20 }}>
        {trainings.map((t) => (
          <div key={t.id} style={s.summaryCard}>
            <div>
              <strong>{t.title}</strong>
              <div style={{ fontSize: 12, color: "#666" }}>{t.institution}</div>
              <div style={{ fontSize: 11, color: "#999" }}>Completed: {t.completion_date || "N/A"}</div>
            </div>
            <div>
              <button onClick={() => { setEditingId(t.id); setFormData(t); }} style={{ ...s.secondaryButton, marginRight: 8 }}>Edit</button>
              <button onClick={() => removeTraining(t.id)} style={{ ...s.secondaryButton, color: "red" }}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Form */}
      <div style={{ padding: 20, border: "1px solid #e5e7eb", borderRadius: 8, background: "#f9fafb" }}>
        <h3 style={{ marginTop: 0 }}>{editingId ? "Edit" : "Add"} Training</h3>
        
        <label style={s.label}>Course / Certification Title</label>
        <input name="title" value={formData.title} onChange={handleChange} style={s.input} placeholder="e.g. AWS Certified Solutions Architect" />
        {fieldErrors.title && <span style={s.errorText}>{fieldErrors.title}</span>}

        <label style={{ ...s.label, marginTop: 10 }}>Institution / Organization</label>
        <input name="institution" value={formData.institution} onChange={handleChange} style={s.input} placeholder="e.g. Coursera, Udemy, Oracle" />
        {fieldErrors.institution && <span style={s.errorText}>{fieldErrors.institution}</span>}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 15, marginTop: 10 }}>
          <div>
            <label style={s.label}>Completion Date</label>
            <input type="date" name="completion_date" value={formData.completion_date} onChange={handleChange} style={s.input} />
          </div>
          <div>
            <label style={s.label}>Certificate Link (URL)</label>
            <input name="certificate_link" value={formData.certificate_link} onChange={handleChange} style={s.input} placeholder="https://..." />
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
          <button onClick={saveTraining} style={s.primaryButton} disabled={loading}>
            {editingId ? "Update Training" : "Add Training"}
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