import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminTemplateEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/admin/templates/${id}`)
      .then(res => setForm(res.data));
  }, [id]);

  if (!form) return "Loading...";

  const update = async () => {
    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("status", form.status);
    fd.append("oldThumbnail", form.thumbnail);
    if (thumbnail) fd.append("thumbnail", thumbnail);

    await axios.put(`http://localhost:5000/api/admin/templates/${id}`, fd);
    navigate("/admin/templates");
  };

  return (
    <>
      <h2>Edit Template</h2>
      <img src={`http://localhost:5000${form.thumbnail}`} width="100" alt="" />
      <input type="file" accept="image/*" onChange={e => setThumbnail(e.target.files[0])} />
      <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
      <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
        <option value={1}>Active</option>
        <option value={0}>Inactive</option>
      </select>
      <button onClick={update}>Update</button>
    </>
  );
}
