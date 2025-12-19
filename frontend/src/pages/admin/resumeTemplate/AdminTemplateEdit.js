import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminTemplateEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/admin/resumetemplates/${id}`)
      .then(res => {
        setForm(res.data);
        setPreview(res.data.thumbnail ? `http://localhost:5000${res.data.thumbnail}` : null);
      });
  }, [id]);

  if (!form) return "Loading...";

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    setThumbnail(file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  const update = async () => {
    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("status", form.status);
    fd.append("oldThumbnail", form.thumbnail);
    if (thumbnail) fd.append("thumbnail", thumbnail);

    try {
      await axios.put(`http://localhost:5000/api/admin/resumetemplates/${id}`, fd);
      navigate(-1); // go back to previous page
    } catch (error) {
      console.error("Error updating template:", error);
    }
  };

  return (
    <>
      <style>{`
        .container {
          min-height: auto;
          display: flex;
          background: #f3f4f6;
          padding: 20px;
        }
        .card {
          background: #fff;
          padding: 30px;
          width: 100%;
          max-width: 420px;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }
        .title {
          text-align: center;
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 20px;
          color: #1f2937;
        }
        label {
          font-weight: 500;
          color: #374151;
          display: block;
          margin-bottom: 12px;
        }
        input, select {
          width: 100%;
          padding: 10px;
          margin-top: 6px;
          border-radius: 6px;
          border: 1px solid #d1d5db;
          font-size: 14px;
        }
        input:focus, select:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 2px rgba(59,130,246,0.2);
        }
        .preview {
          text-align: center;
          margin: 15px 0;
        }
        .preview img {
          width: 140px;
          height: 180px;
          object-fit: cover;
          border-radius: 8px;
          border: 1px solid #d1d5db;
        }
        .buttons {
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
        }
        button {
          padding: 10px 22px;
          border-radius: 6px;
          border: none;
          font-weight: 600;
          cursor: pointer;
        }
        .cancel {
          background: #9ca3af;
          color: white;
        }
        .cancel:hover {
          background: #6b7280;
        }
        .save {
          background: #3b82f6;
          color: white;
        }
        .save:hover {
          background: #2563eb;
        }
      `}</style>

      <div className="container">
        <div className="card">
          <div className="title">Edit Resume Template</div>

          <label>
            Title
            <input
              type="text"
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
            />
          </label>

          <label>
            Thumbnail
            <input type="file" accept="image/*" onChange={handleThumbnailChange} />
          </label>

          {preview && (
            <div className="preview">
              <img src={preview} alt="Preview" />
            </div>
          )}

          <label>
            Status
            <select
              value={form.status}
              onChange={e => setForm({ ...form, status: e.target.value })}
            >
              <option value={1}>Active</option>
              <option value={0}>Inactive</option>
            </select>
          </label>

          <div className="buttons">
            <button className="cancel" onClick={() => navigate(-1)}>Cancel</button>
            <button className="save" onClick={update}>Update</button>
          </div>
        </div>
      </div>
    </>
  );
}
