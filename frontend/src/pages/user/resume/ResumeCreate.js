import { useParams, Navigate } from "react-router-dom";

export default function ResumeCreate() {
  const { templateTitle } = useParams();

  // safety check
  const allowedTemplates = ["modern", "basic", "advance"];

  if (!allowedTemplates.includes(templateTitle)) {
    return <Navigate to="resume/templates" />;
  }

  return (
    <div>
      <h2>Create Resume – {templateTitle.toUpperCase()}</h2>

      {/* LEFT: forms */}
      {/* RIGHT: preview */}
    </div>
  );
}
