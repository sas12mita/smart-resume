import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function SkillsSection({ data, setData, onNext, onBack }) {
  const API_URL = "http://localhost:5000/api/skill";

  const emptyForm = () => ({
    skill_name: "",
    skill_level: "",
  });

  const [skills, setSkills] = useState([]);
  const [formData, setFormData] = useState(emptyForm());
  const [fieldErrors, setFieldErrors] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const isLoggedIn = !!data.token;

  const syncParent = (updated) => {
    setData({ ...data, skills: updated });
  };

  const saveToLocalStorage = (updated) => {
    localStorage.setItem("resumeSkills", JSON.stringify(updated));
  };

  const fetchSkillsFromDB = async () => {
    try {
      const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${data.token}` },
      });
      
      const mapped = res.data.map((item) => ({
        id: item.id,
        skill_name: item.skill_name,
        skill_level: item.skill_level,
      }));

      setSkills(mapped);
      syncParent(mapped);
    } catch (err) {
      console.error("Failed to fetch skills:", err);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchSkillsFromDB();
    } else {
      const stored = localStorage.getItem("resumeSkills");
      if (stored) {
        const parsed = JSON.parse(stored);
        setSkills(parsed);
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
    if (!formData.skill_name) errors.skill_name = "Skill name is required.";
    
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const saveSkill = async () => {
    if (!validate()) return;

    setLoading(true);
    const skillData = {
      skill_name: formData.skill_name,
      skill_level: formData.skill_level,
    };

    try {
      if (isLoggedIn) {
        if (editingId) {
          await axios.put(`${API_URL}/${editingId}`, skillData, {
            headers: { Authorization: `Bearer ${data.token}` },
          });
        } else {
          await axios.post(API_URL, skillData, {
            headers: { Authorization: `Bearer ${data.token}` },
          });
        }
        await fetchSkillsFromDB();
      } else {
        const updated = editingId
          ? skills.map((s) => (s.id === editingId ? { ...s, ...formData } : s))
          : [{ id: Date.now() + Math.random(), ...formData }, ...skills];

        setSkills(updated);
        syncParent(updated);
        saveToLocalStorage(updated);
      }

      setEditingId(null);
      setFormData(emptyForm());
      setFieldErrors({});
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "There was an error saving your skill. Please try again.",
        confirmButtonColor: "#2563eb"
      });
    } finally {
      setLoading(false);
    }
  };

  const editSkill = (skill) => {
    setEditingId(skill.id);
    setFormData({ ...skill });
    setFieldErrors({});
  };

  const removeSkill = async (id) => {
    const result = await Swal.fire({
      title: "Delete this skill?",
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
        await fetchSkillsFromDB();
      } else {
        const updated = skills.filter((s) => s.id !== id);
        setSkills(updated);
        syncParent(updated);
        saveToLocalStorage(updated);
      }
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
    select: { width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "5px", marginBottom: "5px", background: "#fff" },
    errorText: { color: "red", fontSize: "11px", display: "block", marginBottom: "10px" },
    summaryCard: { border: "1px solid #e5e7eb", borderRadius: "8px", padding: "15px", marginTop: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" },
    buttonGroup: { display: "flex", gap: "10px", marginTop: "20px" },
    primaryButton: { padding: "10px 20px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" },
    secondaryButton: { padding: "10px 20px", background: "#f3f4f6", color: "#374151", border: "none", borderRadius: "5px", cursor: "pointer" },
  };

  return (
    <div style={s.container}>
      <h2 style={{ color: "#2563eb" }}>Skills</h2>
      <p style={{ color: "#666", fontSize: 13 }}>Highlight your professional strengths</p>

      {/* Summary List */}
      <div style={{ marginBottom: 30 }}>
        {skills.map((skill) =>
          editingId === skill.id ? null : (
            <div key={skill.id} style={s.summaryCard}>
              <div>
                <strong style={{ display: "block" }}>{skill.skill_name || "Untitled Skill"}</strong>
                <span style={{ fontSize: 12, color: "#666" }}>Level: {skill.skill_level || "Not specified"}</span>
              </div>
              <div>
                <button onClick={() => editSkill(skill)} style={{ ...s.secondaryButton, marginRight: 10 }}>Edit</button>
                <button onClick={() => removeSkill(skill.id)} style={{ ...s.secondaryButton, color: "red" }}>Delete</button>
              </div>
            </div>
          )
        )}
      </div>

      {/* Entry Form */}
      <div style={{ marginBottom: 30, padding: 20, border: "1px solid #e5e7eb", borderRadius: 8, background: "#f9fafb" }}>
        <h3 style={{ marginTop: 0, marginBottom: 20, color: "#374151" }}>{editingId ? "Edit Skill" : "Add New Skill"}</h3>
        
        <label style={s.label}>Skill Name</label>
        <input name="skill_name" value={formData.skill_name} onChange={handleChange} style={s.input} disabled={loading} placeholder="e.g. JavaScript" />
        {fieldErrors.skill_name && <span style={s.errorText}>{fieldErrors.skill_name}</span>}

        <div style={{ marginTop: 10 }}>
          <label style={s.label}>Skill Level (Optional)</label>
          <select name="skill_level" value={formData.skill_level} onChange={handleChange} style={s.select} disabled={loading}>
            <option value="">Select Proficiency</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
            <option value="Expert">Expert</option>
          </select>
        </div>

        <div style={s.buttonGroup}>
          <button onClick={saveSkill} style={s.primaryButton} disabled={loading}>
            {editingId ? (loading ? "Updating..." : "Update Skill") : (loading ? "Adding..." : "+ Add Skill")}
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