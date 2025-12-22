import { initialData } from "../../data/resumeInitialData";

export default function ResumeCreate() {
  const { templateTitle } = useParams();


  const [resumeData, setResumeData] = useState(initialData);
  const [openSection, setOpenSection] = useState(null);

  const allowedTemplates = ["modern", "basic", "advance"];
  if (!allowedTemplates.includes(templateTitle)) {
    return <Navigate to="/resume/templates" replace />;
  }

  return (
    <div className="layout">
      {/* LEFT – ALL FORMS */}
      <div className="left">



        <BioSection
          open={openSection === "bio"}
          onOpen={() => setOpenSection("bio")}
          data={resumeData}
          setData={setResumeData}
        />

        <EducationSection
          open={openSection === "education"}
          onOpen={() => setOpenSection("education")}
          data={resumeData}
          setData={setResumeData}
        />

        <ExperienceSection
          open={openSection === "experience"}
          onOpen={() => setOpenSection("experience")}
          data={resumeData}
          setData={setResumeData}
        />

        <SkillsSection
          open={openSection === "skills"}
          onOpen={() => setOpenSection("skills")}
          data={resumeData}
          setData={setResumeData}
        />

        <ProjectsSection
          open={openSection === "projects"}
          onOpen={() => setOpenSection("projects")}
          data={resumeData}
          setData={setResumeData}
        />
         <TrainingSection
          open={openSection === "training"}
          onOpen={() => setOpenSection("training")}
          data={resumeData}
          setData={setResumeData}
        />

        <LanguagesSection
          open={openSection === "languages"}
          onOpen={() => setOpenSection("languages")}
          data={resumeData}
          setData={setResumeData}
        />

        <HobbiesSection
          open={openSection === "hobbies"}
          onOpen={() => setOpenSection("hobbies")}
          data={resumeData}
          setData={setResumeData}
        />

       

      </div>

      {/* RIGHT – PREVIEW */}
      <div className="right">
        <ResumePreview template={templateTitle} data={resumeData} />
      </div>
    </div>
  );
}
