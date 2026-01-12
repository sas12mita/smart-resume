import React, { useState } from "react";

export default function EducationSection({ data, setData, onNext, onBack }) {

  const emptyForm = () => ({
    school: "",
    degree: "",
    city: "",
    startDate: "",
    endDate: "",
    currentlyStudying: false,
  });

  const [educations, setEducations] = useState(data.education || []);
  const [formData, setFormData] = useState(emptyForm());
  const [editingId, setEditingId] = useState(null);

  const syncParent = (updated) => {
    setData({ ...data, education: updated });
  };

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  /* ---------- ADD ---------- */
  const addEducation = () => {
    const updated = [
      {
        id: Date.now() + Math.random(),
        ...formData,
      },
      ...educations,
    ];

    setEducations(updated);
    syncParent(updated);
    setFormData(emptyForm());
  };

  /* ---------- EDIT ---------- */
  const editEducation = (edu) => {
    setEditingId(edu.id);
    setFormData(edu);
  };

  /* ---------- UPDATE ---------- */
  const updateEducation = () => {
    const updated = educations.map((edu) =>
      edu.id === editingId ? { ...edu, ...formData } : edu
    );

    setEducations(updated);
    syncParent(updated);
    setEditingId(null);
    setFormData(emptyForm());
  };

  /* ---------- DELETE ---------- */
  const removeEducation = (id) => {
    const updated = educations.filter((e) => e.id !== id);
    setEducations(updated);
    syncParent(updated);

    if (editingId === id) {
      setEditingId(null);
      setFormData(emptyForm());
    }
  };

  /* ---------- ORIGINAL STYLES ---------- */
  const s = {
    container: { padding: 20, background: "#fff", maxWidth: "600px" },
    label: { fontSize: 13, fontWeight: "bold", display: "block", marginBottom: 5 },
    input: {
      width: "100%",
      padding: "10px",
      border: "1px solid #ddd",
      borderRadius: "5px",
      marginBottom: "15px",
      boxSizing: "border-box"
    },
    summaryCard: {
      border: "1px solid #e5e7eb",
      borderRadius: "8px",
      padding: "15px",
      marginTop: "10px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    },
    buttonGroup: {
      display: "flex",
      gap: "10px",
      marginTop: "20px"
    },
    primaryButton: {
      padding: "10px 20px",
      background: "#2563eb",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontWeight: "bold"
    },
    secondaryButton: {
      padding: "10px 20px",
      background: "#f3f4f6",
      color: "#374151",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer"
    }
  };

  return (
    <div style={s.container}>
      <h2 style={{ color: "#2563eb" }}>Education</h2>
      <p style={{ color: "#666", fontSize: 13 }}>
        Add your academic background
      </p>

      {/* ================= SUMMARY ================= */}
      <div style={{ marginBottom: 30 }}>
        {educations.map((edu) =>
          editingId === edu.id ? null : (
            <div key={edu.id} style={s.summaryCard}>
              <div>
                <strong style={{ display: "block" }}>
                  {edu.school || "Untitled Education"}
                </strong>
                <span style={{ fontSize: 12, color: "#666" }}>
                  {edu.degree} {edu.degree && "|"} {edu.city}
                </span>
                <div style={{ fontSize: 12, color: "#666", marginTop: 5 }}>
                  {edu.startDate} -{" "}
                  {edu.currentlyStudying ? "Present" : edu.endDate}
                </div>
              </div>
              <div>
                <button
                  onClick={() => editEducation(edu)}
                  style={{
                    color: "#2563eb",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    marginRight: 10
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => removeEducation(edu.id)}
                  style={{
                    color: "red",
                    background: "none",
                    border: "none",
                    cursor: "pointer"
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          )
        )}
      </div>

      {/* ================= FORM ================= */}
      <div
        style={{
          marginBottom: 30,
          padding: "20px",
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
          background: "#f9fafb"
        }}
      >
        <h3 style={{ marginTop: 0, marginBottom: 20, color: "#374151" }}>
          {editingId ? "Edit Education" : "Add New Education"}
        </h3>

        <label style={s.label}>School</label>
        <input
          name="school"
          value={formData.school}
          onChange={handleChange}
          style={s.input}
        />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 15 }}>
          <div>
            <label style={s.label}>Degree</label>
            <input
              name="degree"
              value={formData.degree}
              onChange={handleChange}
              style={s.input}
            />
          </div>
          <div>
            <label style={s.label}>City</label>
            <input
              name="city"
              value={formData.city}
              onChange={handleChange}
              style={s.input}
            />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 15 }}>
          <div>
            <label style={s.label}>Start Date</label>
            <input
              type="month"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              style={s.input}
            />
          </div>
          <div>
            <label style={s.label}>End Date</label>
            <input
              type="month"
              name="endDate"
              disabled={formData.currentlyStudying}
              value={formData.currentlyStudying ? "" : formData.endDate}
              onChange={handleChange}
              style={{
                ...s.input,
                background: formData.currentlyStudying ? "#f0f0f0" : "#fff"
              }}
            />
          </div>
        </div>

        <label style={{ fontSize: 13, display: "flex", gap: 8 }}>
          <input
            type="checkbox"
            name="currentlyStudying"
            checked={formData.currentlyStudying}
            onChange={handleChange}
          />
          I currently study here
        </label>

        <div style={s.buttonGroup}>
          {editingId ? (
            <button onClick={updateEducation} style={s.primaryButton}>
              Update Education
            </button>
          ) : (
            <button onClick={addEducation} style={s.primaryButton}>
              + Add Education
            </button>
          )}
        </div>
      </div>

      {/* ================= NAVIGATION ================= */}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 40 }}>
        <button onClick={onBack} style={s.secondaryButton}>Back</button>
        <button onClick={onNext} style={s.primaryButton}>Continue →</button>
      </div>
    </div>
  );
}
