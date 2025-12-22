import React, { useState } from "react";

export default function EducationSection({ open, onOpen, data, setData }) {
  const [edu, setEdu] = useState({ degree: "", institute: "", year: "" });
  const [editIndex, setEditIndex] = useState(null); // track which entry is being edited

  const saveEducation = () => {
    if (!edu.degree) return;

    if (editIndex !== null) {
      // Edit existing
      const updated = [...data.education];
      updated[editIndex] = edu;
      setData({ ...data, education: updated });
    } else {
      // Add new
      setData({ ...data, education: [...data.education, edu] });
    }

    setEdu({ degree: "", institute: "", year: "" });
    setEditIndex(null);
    onOpen(null);
  };

  const handleEdit = (index) => {
    setEdu(data.education[index]);
    setEditIndex(index);
    onOpen("education");
  };

  const handleDelete = (index) => {
    const updated = data.education.filter((_, i) => i !== index);
    setData({ ...data, education: updated });
  };

  return (
    <div className="section-card">
      <div className="section-header">
        <h4>Education</h4>
        {!open && (
          <button className="add-btn" onClick={() => onOpen("education")}>
            Add
          </button>
        )}
      </div>

      {/* Summary list with Edit/Delete */}
      {data.education.map((e, i) => (
        <div key={i} className="summary-card">
          <strong>{e.degree}</strong> – {e.institute} ({e.year})
          <div style={{ float: "right" }}>
            <button onClick={() => handleEdit(i)}>Edit</button>
            <button onClick={() => handleDelete(i)}>Delete</button>
          </div>
        </div>
      ))}

      {/* Form */}
      {open && (
        <div className="form">
          <div className="form-group">
            <label>Degree</label>
            <input
              value={edu.degree}
              onChange={(e) => setEdu({ ...edu, degree: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Institute</label>
            <input
              value={edu.institute}
              onChange={(e) => setEdu({ ...edu, institute: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Year</label>
            <input
              value={edu.year}
              onChange={(e) => setEdu({ ...edu, year: e.target.value })}
            />
          </div>

          <div className="form-actions">
            <button className="done-btn" onClick={saveEducation}>
              {editIndex !== null ? "Update" : "Save"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
