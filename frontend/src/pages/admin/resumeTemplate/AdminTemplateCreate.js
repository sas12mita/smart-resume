import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminTemplateCreate() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    template_key: "template_one",
    title: "",
    status: 1
  });
  const [thumbnail, setThumbnail] = useState(null);

  const submit = async () => {
    const fd = new FormData();
    fd.append("template_key", form.template_key);
    fd.append("title", form.title);
    fd.append("status", form.status);
    fd.append("thumbnail", thumbnail);

    await axios.post("http://localhost:5000/api/admin/templates", fd);
    navigate("/admin/templates");
  };

  return (
    <>
      <h2>Create Template</h2>
      <select onChange={e => setForm({ ...form, template_key: e.target.value })}>
        <option value="template_one">Template One</option>
        <option value="template_two">Template Two</option>
        <option value="template_three">Template Three</option>
      </select>
      <input placeholder="Title" onChange={e => setForm({ ...form, title: e.target.value })} />
      <input type="file" accept="image/*" onChange={e => setThumbnail(e.target.files[0])} />
      <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
        <option value={1}>Active</option>
        <option value={0}>Inactive</option>
      </select>
      <button onClick={submit}>Save</button>
    </>
  );
}
