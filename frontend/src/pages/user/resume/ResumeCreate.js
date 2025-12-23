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
  const [openSection, setOpenSection] = useState(null);

  const allowedTemplates = ["modern", "basic", "advance"];
  if (!allowedTemplates.includes(templateTitle)) {
    return <Navigate to="/resume/templates" replace />;

  }
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
    <div className="layout">
      {/* LEFT – ALL FORMS */}
      <div className="left">



        <BioSection
          open={openSection === "bio"}
          onOpen={setOpenSection}   // pass state setter directly
          data={resumeData}
          setData={setResumeData}
        />

        <EducationSection
          open={openSection === "education"}
          onOpen={setOpenSection}   // now can open/close
          data={resumeData}
          setData={setResumeData}
        />

        <ExperienceSection
          open={openSection === "experience"}
          onOpen={setOpenSection}
          data={resumeData}
          setData={setResumeData}
        />

        <SkillSection
          open={openSection === "skill"}
          onOpen={setOpenSection}
          data={resumeData}
          setData={setResumeData}
        />




      </div>

      {/* RIGHT – PREVIEW */}
      <div className="right">
        <div className="right">
        
          {renderPreview()}
        </div>      </div>

    </div>
  );
}
