import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Quill from "quill";
import "quill/dist/quill.snow.css";

export default function ExperienceSection({ data, setData, onNext, onBack }) {
  const API_URL = "http://localhost:5000/api/experience";

  const emptyForm = () => ({
    company: "",
    role: "",
    city: "", // Added city back
    start_date: "",
    end_date: "",
    currentlyWorking: false,
    description: "",
  });

  const [experiences, setExperiences] = useState([]);
  const [formData, setFormData] = useState(emptyForm());
  const [fieldErrors, setFieldErrors] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const quillRef = useRef(null);
  const quillInstance = useRef(null);
  const isLoggedIn = !!data.token;

  // Initialize Quill
  useEffect(() => {
    if (quillRef.current && !quillInstance.current) {
      quillInstance.current = new Quill(quillRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            ["bold", "italic", "underline"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["clean"],
          ],
        },
      });

      quillInstance.current.on("text-change", () => {
        const html = quillInstance.current.root.innerHTML;
        // Only update if it's different to prevent infinite loops
        setFormData((prev) => ({ ...prev, description: html }));
      });
    }
  }, []);

  // Sync Quill content when editing or resetting
  useEffect(() => {
    if (quillInstance.current) {
      const currentContents = quillInstance.current.root.innerHTML;
      if (formData.description !== currentContents) {
        quillInstance.current.root.innerHTML = formData.description || "";
      }
    }
  }, [editingId, formData.description === ""]);

  const formatForInput = (dateStr) => (dateStr ? dateStr.split("T")[0] : "");

  const fetchExperienceFromDB = async () => {
    try {
      const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${data.token}` },
      });
      const mapped = res.data.map((item) => ({
        ...item,
        start_date: formatForInput(item.start_date),
        end_date: formatForInput(item.end_date),
        currentlyWorking: !item.end_date,
      }));
      setExperiences(mapped);
      setData({ ...data, experience: mapped });
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    if (isLoggedIn) fetchExperienceFromDB();
    else {
      const stored = localStorage.getItem("resumeExperience");
      if (stored) {
        const parsed = JSON.parse(stored);
        setExperiences(parsed);
        setData({ ...data, experience: parsed });
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    if (fieldErrors[name]) setFieldErrors({ ...fieldErrors, [name]: "" });
  };

  const validate = () => {
    let errors = {};
    if (!formData.company) errors.company = "Company is required.";
    if (!formData.role) errors.role = "Role is required.";
    if (!formData.start_date) errors.start_date = "Start date is required.";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const saveExperience = async () => {
    if (!validate()) return;
    setLoading(true);
    
    const payload = {
      company: formData.company,
      role: formData.role,
      city: formData.city,
      start_date: formData.start_date,
      end_date: formData.currentlyWorking ? null : formData.end_date,
      description: formData.description,
    };

    try {
      if (isLoggedIn) {
        if (editingId) {
          await axios.put(`${API_URL}/${editingId}`, payload, { headers: { Authorization: `Bearer ${data.token}` } });
        } else {
          await axios.post(API_URL, payload, { headers: { Authorization: `Bearer ${data.token}` } });
        }
        await fetchExperienceFromDB();
      } else {
        const updated = editingId
          ? experiences.map((ex) => (ex.id === editingId ? { ...ex, ...formData } : ex))
          : [{ id: Date.now(), ...formData }, ...experiences];
        setExperiences(updated);
        setData({ ...data, experience: updated });
        localStorage.setItem("resumeExperience", JSON.stringify(updated));
      }
      setEditingId(null);
      setFormData(emptyForm());
    } catch (err) {
      Swal.fire("Error", "Could not save experience", "error");
    } finally {
      setLoading(false);
    }
  };

  const removeExperience = async (id) => {
    const result = await Swal.fire({
      title: "Delete this experience?",
      text: "This action cannot be undone.",
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
        await fetchExperienceFromDB();
      } else {
        const updated = experiences.filter((ex) => ex.id !== id);
        setExperiences(updated);
        setData({ ...data, experience: updated });
        localStorage.setItem("resumeExperience", JSON.stringify(updated));
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
      <h2 style={{ color: "#2563eb" }}>Work Experience</h2>

      {/* List of saved experiences */}
      <div style={{ marginBottom: 20 }}>
        {experiences.map((ex) => (
          <div key={ex.id} style={s.summaryCard}>
            <div>
              <strong>{ex.company}</strong>
              <div style={{ fontSize: 12, color: "#666" }}>
                {ex.role} {ex.city && `• ${ex.city}`}
              </div>
              <div style={{ fontSize: 11, color: "#999" }}>
                {ex.start_date} - {ex.currentlyWorking ? "Present" : ex.end_date}
              </div>
            </div>
            <div>
              <button onClick={() => { setEditingId(ex.id); setFormData(ex); }} style={{ ...s.secondaryButton, marginRight: 8 }}>Edit</button>
              <button onClick={() => removeExperience(ex.id)} style={{ ...s.secondaryButton, color: "red" }}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Form */}
      <div style={{ padding: 20, border: "1px solid #e5e7eb", borderRadius: 8, background: "#f9fafb" }}>
        <h3 style={{ marginTop: 0 }}>{editingId ? "Edit" : "Add"} Experience</h3>
        
        <label style={s.label}>Company Name</label>
        <input name="company" value={formData.company} onChange={handleChange} style={s.input} placeholder="e.g. Microsoft" />
        {fieldErrors.company && <span style={s.errorText}>{fieldErrors.company}</span>}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 15, marginTop: 10 }}>
          <div>
            <label style={s.label}>Role / Job Title</label>
            <input name="role" value={formData.role} onChange={handleChange} style={s.input} placeholder="e.g. Product Manager" />
            {fieldErrors.role && <span style={s.errorText}>{fieldErrors.role}</span>}
          </div>
          <div>
            <label style={s.label}>City</label>
            <input name="city" value={formData.city} onChange={handleChange} style={s.input} placeholder="e.g. New York" />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 15, marginTop: 10 }}>
          <div>
            <label style={s.label}>Start Date</label>
            <input type="date" name="start_date" value={formData.start_date} onChange={handleChange} style={s.input} />
            {fieldErrors.start_date && <span style={s.errorText}>{fieldErrors.start_date}</span>}
          </div>
          <div>
            <label style={s.label}>End Date</label>
            <input 
              type="date" 
              name="end_date" 
              value={formData.currentlyWorking ? "" : formData.end_date} 
              onChange={handleChange} 
              disabled={formData.currentlyWorking} 
              style={{ ...s.input, background: formData.currentlyWorking ? "#eee" : "#fff" }} 
            />
          </div>
        </div>

        <label style={{ fontSize: 13, display: "flex", gap: 8, margin: "10px 0 20px 0" }}>
          <input type="checkbox" name="currentlyWorking" checked={formData.currentlyWorking} onChange={handleChange} />
          I currently work here
        </label>

        <label style={s.label}>Description</label>
        <div style={{ background: "#fff", marginBottom: 50 }}>
          <div ref={quillRef} style={{ height: "150px" }}></div>
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={saveExperience} style={s.primaryButton} disabled={loading}>
            {editingId ? "Update Experience" : "Add Experience"}
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