import React, { useState } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { initialData } from "./resumeForm/data/InitialDataSection";
import "./resumeForm/style/resumeform.css";

/* ===== FORM SECTIONS ===== */
import BioSection from "./resumeForm/BioSection";
import EducationSection from "./resumeForm/EducationSection";
import ExperienceSection from "./resumeForm/ExperienceSection";
import SkillSection from "./resumeForm/SkillSection";
import ProjectSection from "./resumeForm/ProjectSection"
import TrainingSection from "./resumeForm/TrainingSection";
import LanguageSection from "./resumeForm/LanguageSection";
import HobbiesSection from "./resumeForm/HobbiesSection";

/* ===== TEMPLATES ===== */
import BasicTemplate from "./template/BasicTemplate";
import AdvanceTemplate from "./template/AdvanceTemplate";

export default function ResumeCreate() {
  const { templateTitle } = useParams();
  const navigate = useNavigate();

  const [resumeData, setResumeData] = useState({
    ...initialData,
    token: localStorage.getItem("userToken") || "",
  });

  const [activeSection, setActiveSection] = useState("bio");

  /* ===== ALL SECTIONS ===== */
  const sections = [
    "bio",
    "education",
    "experience",
    "skill",
    "project",
    "training",
    "language",
    "hobbies",
  ];

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

  const allowedTemplates = ["basic", "advance"];
  if (!allowedTemplates.includes(templateTitle)) {
    return <Navigate to="/resume/templates" replace />;
  }

  /* ===== RENDER FORM ===== */
  const renderForm = () => {
    switch (activeSection) {
      case "bio":
        return <BioSection data={resumeData} setData={setResumeData} onNext={goNext} />;

      case "education":
        return <EducationSection data={resumeData} setData={setResumeData} onNext={goNext} onBack={goBack} />;

      case "experience":
        return <ExperienceSection data={resumeData} setData={setResumeData} onNext={goNext} onBack={goBack} />;

      case "skill":
        return <SkillSection data={resumeData} setData={setResumeData} onNext={goNext} onBack={goBack} />;

      case "project":
        return <ProjectSection data={resumeData} setData={setResumeData} onNext={goNext} onBack={goBack} />;

      case "training":
        return <TrainingSection data={resumeData} setData={setResumeData} onNext={goNext} onBack={goBack} />;

      case "language":
        return <LanguageSection data={resumeData} setData={setResumeData} onNext={goNext} onBack={goBack} />;

      case "hobbies":
        return <HobbiesSection data={resumeData} setData={setResumeData} onBack={goBack} />;

      default:
        return null;
    }
  };

  /* ===== RENDER PREVIEW ===== */
  const renderPreview = () => {
    switch (templateTitle) {
      case "basic":
        return <BasicTemplate data={resumeData} />;
      
      case "advance":
        return <AdvanceTemplate data={resumeData} />;
      default:
        return null;
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
              {sec === "project" && "📂 Projects"}
              {sec === "training" && "📜 Training"}
              {sec === "language" && "🌍 Language"}
              {sec === "hobbies" && "🎯 Hobbies"}
            </div>
          ))}
        </div>

        <div className="resume-form">{renderForm()}</div>
        <div className="resume-preview">{renderPreview()}</div>
      </div>
    </div>
  );
}
