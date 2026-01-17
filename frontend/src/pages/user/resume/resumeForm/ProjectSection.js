import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Quill from "quill";
import "quill/dist/quill.snow.css";

export default function ProjectSection({ data, setData, onNext, onBack }) {
  const API_URL = "http://localhost:5000/api/project";

  const emptyForm = () => ({
    title: "",
    link: "",
    description: "",
  });

  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState(emptyForm());
  const [fieldErrors, setFieldErrors] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const quillRef = useRef(null);
  const quillInstance = useRef(null);
  const isLoggedIn = !!data.token;

  // Initialize Quill (Same as Experience)
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
        setFormData((prev) => ({ ...prev, description: html }));
      });
    }
  }, []);

  // Sync Quill content
  useEffect(() => {
    if (quillInstance.current) {
      const currentContents = quillInstance.current.root.innerHTML;
      if (formData.description !== currentContents) {
        quillInstance.current.root.innerHTML = formData.description || "";
      }
    }
  }, [editingId, formData.description === ""]);

  const fetchProjectsFromDB = async () => {
    try {
      const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${data.token}` },
      });
      setProjects(res.data);
      setData({ ...data, projects: res.data });
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    if (isLoggedIn) fetchProjectsFromDB();
    else {
      const stored = localStorage.getItem("resumeProjects");
      if (stored) {
        const parsed = JSON.parse(stored);
        setProjects(parsed);
        setData({ ...data, projects: parsed });
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
    if (!formData.title) errors.title = "Project title is required.";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const saveProject = async () => {
    if (!validate()) return;
    setLoading(true);
    
    const payload = {
      title: formData.title,
      link: formData.link,
      description: formData.description,
    };

    try {
      if (isLoggedIn) {
        if (editingId) {
          await axios.put(`${API_URL}/${editingId}`, payload, { headers: { Authorization: `Bearer ${data.token}` } });
        } else {
          await axios.post(API_URL, payload, { headers: { Authorization: `Bearer ${data.token}` } });
        }
        await fetchProjectsFromDB();
      } else {
        const updated = editingId
          ? projects.map((p) => (p.id === editingId ? { ...p, ...formData } : p))
          : [{ id: Date.now(), ...formData }, ...projects];
        setProjects(updated);
        setData({ ...data, projects: updated });
        localStorage.setItem("resumeProjects", JSON.stringify(updated));
      }
      setEditingId(null);
      setFormData(emptyForm());
    } catch (err) {
      Swal.fire("Error", "Could not save project", "error");
    } finally {
      setLoading(false);
    }
  };

  const removeProject = async (id) => {
    const result = await Swal.fire({
      title: "Delete this project?",
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
        await fetchProjectsFromDB();
      } else {
        const updated = projects.filter((p) => p.id !== id);
        setProjects(updated);
        setData({ ...data, projects: updated });
        localStorage.setItem("resumeProjects", JSON.stringify(updated));
      }
    } catch (err) {
      Swal.fire("Error", "Failed to delete project", "error");
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
      <h2 style={{ color: "#2563eb" }}>Personal Projects</h2>

      {/* List of saved projects */}
      <div style={{ marginBottom: 20 }}>
        {projects.map((p) => (
          <div key={p.id} style={s.summaryCard}>
            <div>
              <strong>{p.title}</strong>
              {p.link && (
                <div style={{ fontSize: 12, color: "#2563eb" }}>
                  <a href={p.link} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                    {p.link}
                  </a>
                </div>
              )}
            </div>
            <div>
              <button onClick={() => { setEditingId(p.id); setFormData(p); }} style={{ ...s.secondaryButton, marginRight: 8 }}>Edit</button>
              <button onClick={() => removeProject(p.id)} style={{ ...s.secondaryButton, color: "red" }}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Form */}
      <div style={{ padding: 20, border: "1px solid #e5e7eb", borderRadius: 8, background: "#f9fafb" }}>
        <h3 style={{ marginTop: 0 }}>{editingId ? "Edit" : "Add"} Project</h3>
        
        <label style={s.label}>Project Title</label>
        <input name="title" value={formData.title} onChange={handleChange} style={s.input} placeholder="e.g. E-commerce Platform" />
        {fieldErrors.title && <span style={s.errorText}>{fieldErrors.title}</span>}

        <label style={{ ...s.label, marginTop: 10 }}>Project Link (Optional)</label>
        <input name="link" value={formData.link} onChange={handleChange} style={s.input} placeholder="e.g. https://github.com/yourusername/project" />

        <label style={{ ...s.label, marginTop: 10 }}>Description</label>
        <div style={{ background: "#fff", marginBottom: 50 }}>
          <div ref={quillRef} style={{ height: "150px" }}></div>
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={saveProject} style={s.primaryButton} disabled={loading}>
            {editingId ? "Update Project" : "Add Project"}
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