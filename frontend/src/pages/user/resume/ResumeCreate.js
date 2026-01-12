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

  // ✅ FIXED: Initialize with the token from localStorage so BioSection knows we are logged in
  const [resumeData, setResumeData] = useState({
    ...initialData,
    token: localStorage.getItem("userToken") || "" 
  });
  
  const [activeSection, setActiveSection] = useState("bio");

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

  const allowedTemplates = ["basic", "modern", "advance"];
  if (!allowedTemplates.includes(templateTitle)) {
    return <Navigate to="/resume/templates" replace />;
  }

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

  const renderPreview = () => {
    switch (templateTitle) {
      case "basic": return <BasicTemplate data={resumeData} />;
      case "modern": return <ModernTemplate data={resumeData} />;
      case "advance": return <AdvanceTemplate data={resumeData} />;
      default: return null;
    }
  };

  return (
    <div className="resume-builder">
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

      <div className="resume-body">
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

        <div className="resume-form">{renderForm()}</div>
        <div className="resume-preview">{renderPreview()}</div>
      </div>
    </div>
  );
}