import { useNavigate } from "react-router-dom";

const templates = [
  {
    id: "template1",
    title: "Basic",
    thumbnail: "/image/basic.jpg",
  },
  {
    id: "template2",
    title: "Modern",
    thumbnail: "/image/modern.jpg",
  },
  {
    id: "template3",
    title: "Advance",
    thumbnail: "/image/advance.jpg",
  },
];

export default function TemplateSelect() {
  const navigate = useNavigate();

  const selectTemplate = (title) => {
    navigate(`/user/dashboard/resume/template/create/${title.toLowerCase()}`);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Select Resume Template</h2>

      <div style={{ display: "flex", gap: 20 }}>
        {templates.map((t) => (
          <div
            key={t.title}
            onClick={() => selectTemplate(t.title)}
            style={{
              cursor: "pointer",
              border: "1px solid #ccc",
              padding: 10,
              width: 200,
            }}
          >
            <img src={t.thumbnail} alt={t.title} width="100%" />
            <h4>{t.title} Resume</h4>
          </div>
        ))}
      </div>
    </div>
  );
}
