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
  const [preview, setPreview] = useState(null);

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    setThumbnail(file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  const submit = async () => {
    const fd = new FormData();
    fd.append("template_key", form.template_key);
    fd.append("title", form.title);
    fd.append("status", form.status);
    fd.append("thumbnail", thumbnail);

    try {
      await axios.post("http://localhost:5000/api/admin/resumetemplates/", fd);
      navigate(-1);
    } catch (error) {
      console.error("Error creating template:", error);
    }
  };

  return (
    <>
      {/* INLINE CSS */}
      <style>
        {`
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
        `}
      </style>

      <div className="container">
        <div className="card">
          <div className="title">Create Resume Template</div>

          <label>
            Select Template
            <select
              value={form.template_key}
              onChange={(e) =>
                setForm({ ...form, template_key: e.target.value })
              }
            >
              <option value="template_one">Template One</option>
              <option value="template_two">Template Two</option>
              <option value="template_three">Template Three</option>
            </select>
          </label>

          <label>
            Title
            <input
              type="text"
              placeholder="Enter Template Title"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
            />
          </label>

          <label>
            Thumbnail
            <input
              type="file"
              accept="image/*"
              onChange={handleThumbnailChange}
            />
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
              onChange={(e) =>
                setForm({ ...form, status: e.target.value })
              }
            >
              <option value={1}>Active</option>
              <option value={0}>Inactive</option>
            </select>
          </label>

          <div className="buttons">
            <button className="cancel" onClick={() => navigate("/admin/templates")}>
              Cancel
            </button>
            <button className="save" onClick={submit}>
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
