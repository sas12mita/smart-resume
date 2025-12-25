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

  // ✅ HOOKS MUST BE AT TOP (NO CONDITIONS ABOVE)
  const [resumeData, setResumeData] = useState(initialData);
  const [activeSection, setActiveSection] = useState("bio");

  // 🔁 FORM FLOW ORDER
  const sections = ["bio", "education", "experience", "skill"];
  const currentIndex = sections.indexOf(activeSection);

  const goNext = () => {
    if (currentIndex < sections.length - 1) {
      setActiveSection(sections[currentIndex + 1]);
    }
  };

  const goBack = () => {
    if (currentIndex > 0) {
      setActiveSection(sections[currentIndex - 1]);
    }
  };

  // ✅ SAFE TO RETURN AFTER HOOKS
  const allowedTemplates = ["basic", "modern", "advance"];
  if (!allowedTemplates.includes(templateTitle)) {
    return <Navigate to="/resume/templates" replace />;
  }

  // 🔁 FORM RENDER
  const renderForm = () => {
    switch (activeSection) {
      case "bio":
        return (
          <BioSection
            data={resumeData}
            setData={setResumeData}
            onNext={goNext}
          />
        );

      case "education":
        return (
          <EducationSection
            data={resumeData}
            setData={setResumeData}
            onNext={goNext}
            onBack={goBack}
          />
        );

      case "experience":
        return (
          <ExperienceSection
            data={resumeData}
            setData={setResumeData}
            onNext={goNext}
            onBack={goBack}
          />
        );

      case "skill":
        return (
          <SkillSection
            data={resumeData}
            setData={setResumeData}
            onBack={goBack}
          />
        );

      default:
        return null;
    }
  };

  // 🔁 PREVIEW RENDER (YOUR EXISTING TEMPLATES)
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

      {/* ===== TOP NAV ===== */}
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

      {/* ===== BODY ===== */}
      <div className="resume-body">

        {/* LEFT SIDEBAR */}
        <div className="resume-sidebar">
          {sections.map((sec) => (
            <div
              key={sec}
              className={activeSection === sec ? "active" : ""}
              onClick={() => setActiveSection(sec)}
            >
              {sec === "bio" && "👤 Bio"}
              {sec === "education" && "🎓 Education"}
              {sec === "experience" && "💼 Experience"}
              {sec === "skill" && "🛠 Skills"}
            </div>
          ))}
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
