import React, { useState } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { initialData } from "./resumeForm/data/InitialDataSection";
import "./resumeForm/style/resumeform.css";

import BioSection from "./resumeForm/BioSection";
import EducationSection from "./resumeForm/EducationSection";
import ExperienceSection from "./resumeForm/ExperienceSection";
import SkillSection from "./resumeForm/SkillSection";

import BasicTemplate from "./template/BasicTemplate";
import ModernTemplate from "./template/ModernTemplate";
import AdvanceTemplate from "./template/AdvanceTemplate";

export default function ResumeCreate() {
  const { templateTitle } = useParams();
  const navigate = useNavigate();

  const [resumeData, setResumeData] = useState(initialData);
  const [activeSection, setActiveSection] = useState("bio");

  const allowedTemplates = ["basic", "modern", "advance"];
  if (!allowedTemplates.includes(templateTitle)) {
    return <Navigate to="/resume/templates" replace />;
  }

  const renderForm = () => {
    switch (activeSection) {
      case "bio":
        return <BioSection data={resumeData} setData={setResumeData} />;
      case "education":
        return <EducationSection data={resumeData} setData={setResumeData} />;
      case "experience":
        return <ExperienceSection data={resumeData} setData={setResumeData} />;
      case "skill":
        return <SkillSection data={resumeData} setData={setResumeData} />;
      default:
        return null;
    }
  };

  const renderPreview = () => {
    switch (templateTitle) {
      case "basic":
        return <BasicTemplate data={resumeData} />;
      case "modern":
        return <ModernTemplate data={resumeData} />;
      case "advance":
        return <AdvanceTemplate data={resumeData} />;
      default:
        return null;
    }
  };

  return (
    <div className="resume-builder">

      {/* ===== TOP NAVBAR ===== */}
      <div className="resume-navbar">
        <h3>Smart Resume</h3>

        <div className="template-switch">
          {allowedTemplates.map((tpl) => (
            <button
              key={tpl}
              className={templateTitle === tpl ? "active" : ""}
              onClick={() => navigate(`/user/resume/create/${tpl}`)}
            >
              {tpl.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* ===== MAIN BODY ===== */}
      <div className="resume-body">

        {/* LEFT SIDEBAR */}
        <div className="resume-sidebar">
          <div className={activeSection === "bio" ? "active" : ""} onClick={() => setActiveSection("bio")}>👤 Bio</div>
          <div className={activeSection === "education" ? "active" : ""} onClick={() => setActiveSection("education")}>🎓 Education</div>
          <div className={activeSection === "experience" ? "active" : ""} onClick={() => setActiveSection("experience")}>💼 Experience</div>
          <div className={activeSection === "skill" ? "active" : ""} onClick={() => setActiveSection("skill")}>🛠 Skills</div>
        </div>

        {/* CENTER FORM */}
        <div className="resume-form">
          {renderForm()}
        </div>

        {/* RIGHT PREVIEW */}
        <div className="resume-preview">
          {renderPreview()}
        </div>

      </div>
    </div>
  );
}
