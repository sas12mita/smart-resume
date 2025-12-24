import React, { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { initialData } from "./resumeForm/data/InitialDataSection";
import './resumeForm/style/resumeform.css';

import BioSection from "./resumeForm/BioSection";
import EducationSection from "./resumeForm/EducationSection";
import ExperienceSection from "./resumeForm/ExperienceSection";
import SkillSection from "./resumeForm/SkillSection";

import AdvanceTemplate from "./template/AdvanceTemplate";
import BasicTemplate from "./template/BasicTemplate";
import ModernTemplate from "./template/ModernTemplate";

export default function ResumeCreate() {
  const { templateTitle } = useParams();
  const [resumeData, setResumeData] = useState(initialData);
  const [activeSection, setActiveSection] = useState("bio"); // start with Bio

  const allowedTemplates = ["modern", "basic", "advance"];
  if (!allowedTemplates.includes(templateTitle)) {
    return <Navigate to="/resume/templates" replace />;
  }

  const renderForm = () => {
    switch(activeSection) {
      case "bio": return <BioSection open={true} onOpen={setActiveSection} data={resumeData} setData={setResumeData} next="education" />;
      case "education": return <EducationSection open={true} onOpen={setActiveSection} data={resumeData} setData={setResumeData} next="experience" />;
      case "experience": return <ExperienceSection open={true} onOpen={setActiveSection} data={resumeData} setData={setResumeData} next="skill" />;
      case "skill": return <SkillSection open={true} onOpen={setActiveSection} data={resumeData} setData={setResumeData} next={null} />;
      default: return null;
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
    <div className="smart-layout">
      {/* LEFT Sidebar */}
      <div className="smart-sidebar">
        <div className={`sidebar-item ${activeSection==="bio"?"active":""}`} onClick={() => setActiveSection("bio")}>
          <span className="sidebar-icon">👤</span>
          <span>About</span>
        </div>
        <div className={`sidebar-item ${activeSection==="education"?"active":""}`} onClick={() => setActiveSection("education")}>
          <span className="sidebar-icon">🎓</span>
          <span>Education</span>
        </div>
        <div className={`sidebar-item ${activeSection==="experience"?"active":""}`} onClick={() => setActiveSection("experience")}>
          <span className="sidebar-icon">💼</span>
          <span>Experience</span>
        </div>
        <div className={`sidebar-item ${activeSection==="skill"?"active":""}`} onClick={() => setActiveSection("skill")}>
          <span className="sidebar-icon">🛠️</span>
          <span>Skills</span>
        </div>
      </div>

      {/* CENTER – Form Area */}
      <div className="smart-form-area">
        {renderForm()}
      </div>

      {/* RIGHT – Preview */}
      <div className="smart-preview">
        {renderPreview()}
      </div>
    </div>
  );
}
