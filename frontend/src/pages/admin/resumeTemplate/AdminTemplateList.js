import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminTemplateList() {
  const [templates, setTemplates] = useState([]);
  const navigate = useNavigate();

  const fetchTemplates = () =>
    axios.get("http://localhost:5000/api/admin/templates")
      .then(res => setTemplates(res.data));

  useEffect(() => { fetchTemplates(); }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/admin/templates/${id}`)
      .then(() => fetchTemplates());
  };

  return (
    <>
      <button onClick={() => navigate("/admin/templates/create")}>Add Template</button>
      {templates.map(t => (
        <div key={t.id}>
          <img src={`http://localhost:5000${t.thumbnail}`} width="80" alt="" />
          <p>{t.title}</p>
          <button onClick={() => navigate(`/admin/templates/edit/${t.id}`)}>Edit</button>
          <button onClick={() => handleDelete(t.id)}>Delete</button>
        </div>
      ))}
    </>
  );
}
