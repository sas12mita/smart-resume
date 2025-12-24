import React, { useState } from "react"; // React and useState
import { useParams, Navigate } from "react-router-dom";
export default function ExperienceSection({ open, onOpen, data, setData }) {
  const [exp, setExp] = React.useState({
    role: "",
    company: "",
    duration: "",
    description: ""
  });

  const addExperience = () => {
    setData({
      ...data,
      experience: [...data.experience, exp]
    });
    setExp({ role: "", company: "", duration: "", description: "" });
    onOpen(null);
  };

  return (
    <div className="section-card">
      <div className="section-header" onClick={() => onOpen("experience")}>
        <h4>Experience</h4>
        <button className="add-btn">Add</button>
      </div>

      {open ? (
        <>
          <div className="form-group">
            <label>Job Title</label>
            <input value={exp.role} onChange={(e) => setExp({ ...exp, role: e.target.value })} />
          </div>

          <div className="form-group">
            <label>Company</label>
            <input value={exp.company} onChange={(e) => setExp({ ...exp, company: e.target.value })} />
          </div>

          <div className="form-group">
            <label>Duration</label>
            <input value={exp.duration} onChange={(e) => setExp({ ...exp, duration: e.target.value })} />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea value={exp.description} onChange={(e) => setExp({ ...exp, description: e.target.value })} />
          </div>

          <div className="form-actions">
            <button className="done-btn" onClick={addExperience}>Save</button>
          </div>
        </>
      ) : (
        data.experience.map((e, i) => (
          <div key={i} className="summary-card">
            <strong>{e.role}</strong> – {e.company}
          </div>
        ))
      )}
    </div>
  );
}
