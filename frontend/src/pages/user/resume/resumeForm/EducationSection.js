import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function EducationSection({ data, setData, onNext, onBack }) {
  const API_URL = "http://localhost:5000/api/education";

  const emptyForm = () => ({
    institution: "",
    degree: "",
    city: "",
    start_date: "",
    end_date: "",
    currentlyStudying: false,
  });

  const [educations, setEducations] = useState([]);
  const [formData, setFormData] = useState(emptyForm());
  const [fieldErrors, setFieldErrors] = useState({}); 
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const isLoggedIn = !!data.token;

  const syncParent = (updated) => {
    setData({ ...data, education: updated });
  };

  const saveToLocalStorage = (updated) => {
    localStorage.setItem("resumeEducation", JSON.stringify(updated));
  };

  const formatForInput = (dateStr) => {
    if (!dateStr) return "";
    return dateStr.split("T")[0]; 
  };

  const fetchEducationFromDB = async () => {
    try {
      const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${data.token}` },
      });
      
      const mapped = res.data.map((item) => ({
        id: item.id,
        institution: item.institution,
        degree: item.degree,
        city: item.city,
        start_date: formatForInput(item.start_date),
        end_date: formatForInput(item.end_date),
        currentlyStudying: !item.end_date || item.end_date === null,
      }));

      setEducations(mapped);
      syncParent(mapped);
    } catch (err) {
      console.error("Failed to fetch education:", err);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchEducationFromDB();
    } else {
      const stored = localStorage.getItem("resumeEducation");
      if (stored) {
        const parsed = JSON.parse(stored);
        setEducations(parsed);
        syncParent(parsed);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    // Clear red error as user fixes the field
    if (fieldErrors[name]) {
      setFieldErrors({ ...fieldErrors, [name]: "" });
    }
  };

  const validate = () => {
    let errors = {};
    if (!formData.institution) errors.institution = "Institution name is required.";
    if (!formData.degree) errors.degree = "Degree is required.";
    if (!formData.start_date) errors.start_date = "Please select a start date.";

    // ✅ Date Logic: Check if End Date is before Start Date
    if (!formData.currentlyStudying && formData.end_date && formData.start_date) {
      if (new Date(formData.end_date) < new Date(formData.start_date)) {
        errors.end_date = "End date cannot be earlier than your start date.";
      }
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const saveEducation = async () => {
    if (!validate()) return;

    setLoading(true);
    const eduData = {
      degree: formData.degree,
      institution: formData.institution,
      city: formData.city,
      start_date: formData.start_date,
      end_date: formData.currentlyStudying ? null : formData.end_date,
    };

    try {
      if (isLoggedIn) {
        if (editingId) {
          await axios.put(`${API_URL}/${editingId}`, eduData, {
            headers: { Authorization: `Bearer ${data.token}` },
          });
        } else {
          await axios.post(API_URL, eduData, {
            headers: { Authorization: `Bearer ${data.token}` },
          });
        }
        await fetchEducationFromDB();
      } else {
        const updated = editingId
          ? educations.map((edu) => (edu.id === editingId ? { ...edu, ...formData } : edu))
          : [{ id: Date.now() + Math.random(), ...formData }, ...educations];

        setEducations(updated);
        syncParent(updated);
        saveToLocalStorage(updated);
      }

      // Success is silent: reset form and clear errors
      setEditingId(null);
      setFormData(emptyForm());
      setFieldErrors({});
    } catch (err) {
      // ✅ Only show Swal on unexpected system/server errors
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "There was an error saving your data. Please try again.",
        confirmButtonColor: "#2563eb"
      });
    } finally {
      setLoading(false);
    }
  };

  const editEducation = (edu) => {
    setEditingId(edu.id);
    setFormData({
      ...edu,
      start_date: formatForInput(edu.start_date),
      end_date: formatForInput(edu.end_date),
    });
    setFieldErrors({}); // Clear any leftover red errors
  };

  const removeEducation = async (id) => {
    // ✅ Swal only for confirmation
    const result = await Swal.fire({
      title: "Delete this education?",
      text: "This cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#374151",
      confirmButtonText: "Yes, delete it"
    });

    if (!result.isConfirmed) return;

    setLoading(true);
    try {
      if (isLoggedIn) {
        await axios.delete(`${API_URL}/${id}`, {
          headers: { Authorization: `Bearer ${data.token}` },
        });
        await fetchEducationFromDB();
      } else {
        const updated = educations.filter((edu) => edu.id !== id);
        setEducations(updated);
        syncParent(updated);
        saveToLocalStorage(updated);
      }
      // Success after delete is silent
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text: "Could not remove this entry.",
        confirmButtonColor: "#2563eb"
      });
    } finally {
      setLoading(false);
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
      <h2 style={{ color: "#2563eb" }}>Education</h2>
      <p style={{ color: "#666", fontSize: 13 }}>Add your academic background</p>

      {/* Summary List */}
      <div style={{ marginBottom: 30 }}>
        {educations.map((edu) =>
          editingId === edu.id ? null : (
            <div key={edu.id} style={s.summaryCard}>
              <div>
                <strong style={{ display: "block" }}>{edu.institution || "Untitled Education"}</strong>
                <span style={{ fontSize: 12, color: "#666" }}>{edu.degree} {edu.degree && "|"} {edu.city}</span>
                <div style={{ fontSize: 12, color: "#666", marginTop: 5 }}>
                  {edu.start_date} - {edu.currentlyStudying ? "Present" : edu.end_date}
                </div>
              </div>
              <div>
                <button onClick={() => editEducation(edu)} style={{ ...s.secondaryButton, marginRight: 10 }}>Edit</button>
                <button onClick={() => removeEducation(edu.id)} style={{ ...s.secondaryButton, color: "red" }}>Delete</button>
              </div>
            </div>
          )
        )}
      </div>

      {/* Entry Form */}
      <div style={{ marginBottom: 30, padding: 20, border: "1px solid #e5e7eb", borderRadius: 8, background: "#f9fafb" }}>
        <h3 style={{ marginTop: 0, marginBottom: 20, color: "#374151" }}>{editingId ? "Edit Education" : "Add New Education"}</h3>
        
        <label style={s.label}>Institution</label>
        <input name="institution" value={formData.institution} onChange={handleChange} style={s.input} disabled={loading} placeholder="e.g. Harvard University" />
        {fieldErrors.institution && <span style={s.errorText}>{fieldErrors.institution}</span>}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 15, marginTop: 10 }}>
          <div>
            <label style={s.label}>Degree</label>
            <input name="degree" value={formData.degree} onChange={handleChange} style={s.input} disabled={loading} placeholder="e.g. Bachelor of Science" />
            {fieldErrors.degree && <span style={s.errorText}>{fieldErrors.degree}</span>}
          </div>
          <div>
            <label style={s.label}>City</label>
            <input name="city" value={formData.city} onChange={handleChange} style={s.input} disabled={loading} placeholder="e.g. New York" />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 15, marginTop: 10 }}>
          <div>
            <label style={s.label}>Start Date</label>
            <input type="date" name="start_date" value={formData.start_date} onChange={handleChange} style={s.input} disabled={loading} />
            {fieldErrors.start_date && <span style={s.errorText}>{fieldErrors.start_date}</span>}
          </div>
          <div>
            <label style={s.label}>End Date</label>
            <input
              type="date"
              name="end_date"
              value={formData.currentlyStudying ? "" : formData.end_date}
              onChange={handleChange}
              disabled={formData.currentlyStudying || loading}
              style={{ ...s.input, background: formData.currentlyStudying ? "#f0f0f0" : "#fff" }}
            />
            {fieldErrors.end_date && <span style={s.errorText}>{fieldErrors.end_date}</span>}
          </div>
        </div>

        <label style={{ fontSize: 13, display: "flex", gap: 8, marginTop: 10, cursor: "pointer" }}>
          <input type="checkbox" name="currentlyStudying" checked={formData.currentlyStudying} onChange={handleChange} disabled={loading} />
          I currently study here
        </label>

        <div style={s.buttonGroup}>
          <button onClick={saveEducation} style={s.primaryButton} disabled={loading}>
            {editingId ? (loading ? "Updating..." : "Update Education") : (loading ? "Adding..." : "+ Add Education")}
          </button>
          {editingId && (
            <button onClick={() => { setEditingId(null); setFormData(emptyForm()); setFieldErrors({}); }} style={s.secondaryButton}>
              Cancel
            </button>
          )}
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 40 }}>
        <button onClick={onBack} style={s.secondaryButton} disabled={loading}>Back</button>
        <button onClick={onNext} style={s.primaryButton} disabled={loading}>Continue →</button>
      </div>
    </div>
  );
}