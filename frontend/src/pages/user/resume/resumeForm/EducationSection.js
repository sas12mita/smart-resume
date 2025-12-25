import React, { useState } from "react";

export default function EducationSection({ data, setData, onNext, onBack }) {

  // ✅ create fresh object every time (IMPORTANT)
  const createEmptyForm = () => ({
    school: "",
    degree: "",
    city: "",
    startDate: "",
    endDate: "",
    currentlyStudying: false,
  });

  // ✅ initialize safely
  const [forms, setForms] = useState(
    data.education && data.education.length > 0
      ? data.education
      : [createEmptyForm()]
  );

  const [showFormIndexes, setShowFormIndexes] = useState([0]);

  // ✅ ESLint-safe handler
  const handleChange = (index, e) => {
    const { name, type, value, checked } = e.target;
    const updated = [...forms];

    updated[index][name] = type === "checkbox" ? checked : value;

    setForms(updated);
    setData({ ...data, education: updated });
  };

  // ✅ add new education (collapse previous)
  const addEducation = () => {
    const newForms = [...forms, createEmptyForm()];
    setForms(newForms);
    setShowFormIndexes([newForms.length - 1]);
    setData({ ...data, education: newForms });
  };

  // ✅ remove education
  const removeEducation = (index) => {
    const updatedForms = forms.filter((_, i) => i !== index);
    setForms(updatedForms);
    setShowFormIndexes(showFormIndexes.filter(i => i !== index));
    setData({ ...data, education: updatedForms });
  };

  // ✅ validation before continue
  const handleContinue = () => {
    for (let f of forms) {
      if (!f.school || !f.startDate) {
        alert("School and start date are required");
        return;
      }
      if (!f.currentlyStudying && !f.endDate) {
        alert("End date is required unless currently studying");
        return;
      }
    }
    onNext();
  };

  // 🎨 styles
  const s = {
    container: { padding: "20px", background: "#fff" },
    header: { fontSize: "26px", fontWeight: "bold", color: "#2563eb" },
    sub: { fontSize: "13px", color: "#666", marginBottom: "20px" },
    card: { border: "1px solid #e5e7eb", borderRadius: "6px", padding: "14px", marginBottom: "10px", background: "#f9fafb" },
    input: { width: "100%", padding: "12px", border: "1px solid #d1d5db", borderRadius: "4px", background: "#f9fafb" },
    label: { fontSize: "12px", fontWeight: "600", marginBottom: "4px" },
    btnBlue: { background: "#2563eb", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" },
    summary: { border: "1px solid #ddd", borderRadius: "6px", padding: "12px", marginBottom: "10px", background: "#fff" }
  };

  return (
    <div style={s.container}>
      <h1 style={s.header}>Education</h1>
      <p style={s.sub}>Add your academic background</p>

      {forms.map((form, index) => (
        <div key={index}>

          {/* COLLAPSED VIEW */}
          {!showFormIndexes.includes(index) && (
            <div style={s.summary}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <strong>{form.school}</strong>
                  <div style={{ fontSize: 12, color: "#666" }}>
                    {form.degree} | {form.city} | {form.startDate} – {form.currentlyStudying ? "Present" : form.endDate}
                  </div>
                </div>
                <div>
                  <button
                    onClick={() => setShowFormIndexes([index])}
                    style={{ marginRight: 10, background: "none", border: "none", color: "#2563eb", cursor: "pointer" }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => removeEducation(index)}
                    style={{ background: "none", border: "none", color: "red", cursor: "pointer" }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* EXPANDED FORM */}
          {showFormIndexes.includes(index) && (
            <div style={s.card}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 15 }}>
                <div style={{ gridColumn: "span 2" }}>
                  <label style={s.label}>School</label>
                  <input name="school" value={form.school} onChange={(e) => handleChange(index, e)} style={s.input} />
                </div>

                <div>
                  <label style={s.label}>Degree</label>
                  <input name="degree" value={form.degree} onChange={(e) => handleChange(index, e)} style={s.input} />
                </div>

                <div>
                  <label style={s.label}>City</label>
                  <input name="city" value={form.city} onChange={(e) => handleChange(index, e)} style={s.input} />
                </div>

                <div>
                  <label style={s.label}>Start Date</label>
                  <input type="month" name="startDate" value={form.startDate} onChange={(e) => handleChange(index, e)} style={s.input} />
                </div>

                <div>
                  <label style={s.label}>End Date</label>
                  {form.currentlyStudying ? (
                    <input value="Present" disabled style={{ ...s.input, color: "#999" }} />
                  ) : (
                    <input type="month" name="endDate" value={form.endDate} onChange={(e) => handleChange(index, e)} style={s.input} />
                  )}
                </div>
              </div>

              <label style={{ fontSize: 13, display: "block", marginTop: 10 }}>
                <input
                  type="checkbox"
                  name="currentlyStudying"
                  checked={form.currentlyStudying}
                  onChange={(e) => handleChange(index, e)}
                />{" "}
                I currently study here
              </label>

              <div style={{ marginTop: 10 }}>
                <span
                  onClick={addEducation}
                  style={{ color: "#2563eb", cursor: "pointer", fontWeight: 600 }}
                >
                  + Add Education
                </span>
              </div>
            </div>
          )}
        </div>
      ))}

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 30 }}>
        <button onClick={onBack}>Back</button>
        <button onClick={handleContinue} style={s.btnBlue}>
          Continue to Experience →
        </button>
      </div>
    </div>
  );
}
