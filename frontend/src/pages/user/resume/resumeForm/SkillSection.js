import { useState } from "react";

export default function SkillSection({ open, onOpen, data, setData }) {
  const [skill, setSkill] = useState({
    skill_name: "",
    skill_level: ""
  });

  const addSkill = () => {
    if (!skill.skill_name) return;

    setData({
      ...data,
      skill: [...data.skill, skill]
    });

    setSkill({ skill_name: "", skill_level: "" });
    onOpen(null);
  };

  return (
    <div className="section-card">
      <div className="section-header" onClick={() => onOpen("skill")}>
        <h4>Skills</h4>
        <button className="add-btn">Add</button>
      </div>

      {open ? (
        <>
          <div className="form-group">
            <label>Skill Name</label>
            <input
              value={skill.skill_name}
              onChange={(e) =>
                setSkill({ ...skill, skill_name: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label>Skill Level</label>
            <input
              value={skill.skill_level}
              onChange={(e) =>
                setSkill({ ...skill, skill_level: e.target.value })
              }
              placeholder="Beginner / Intermediate / Advanced"
            />
          </div>

          <div className="form-actions">
            <button className="done-btn" onClick={addSkill}>
              Save
            </button>
          </div>
        </>
      ) : (
        data.skill.map((s, i) => (
          <div key={i} className="summary-card">
            {s.skill_name} {s.skill_level && `(${s.skill_level})`}
          </div>
        ))
      )}
    </div>
  );
}
