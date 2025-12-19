import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function AdminTemplateList() {
  const [templates, setTemplates] = useState([]);
  const navigate = useNavigate();

  const BASE_URL = "http://localhost:5000/api/admin/resumetemplates";

  // Fetch all templates
  const fetchTemplates = () => {
    axios
      .get(BASE_URL)
      .then(res => setTemplates(res.data))
      .catch(err => console.error("Error fetching templates:", err));
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  // Delete template with SweetAlert2 confirmation
  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This action cannot be undone!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${BASE_URL}/${id}`)
          .then(() => {
            Swal.fire('Deleted!', 'The template has been deleted.', 'success');
            fetchTemplates();
          })
          .catch(err => {
            Swal.fire('Error!', 'Something went wrong.', 'error');
            console.error("Error deleting template:", err);
          });
      }
    });
  };

  return (
    <div>
      <button
        onClick={() => navigate("/admin/dashboard/templates/create")}
        style={{ marginBottom: "15px" }}
      >
        Add Template
      </button>

      <table border="1" cellPadding="10" cellSpacing="0" width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>Thumbnail</th>
            <th>Title</th>
            <th>Template Key</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {templates.length > 0 ? (
            templates.map((t) => (
              <tr key={t.id}>
                <td>{t.id}</td>
                <td>
                  <img
                    src={`http://localhost:5000${t.thumbnail}`}
                    alt={t.title}
                    width="80"
                  />
                </td>
                <td>{t.title}</td>
                <td>{t.template_key}</td>
                <td>{t.status === 1 ? "Active" : "Inactive"}</td>
                <td>
                  <button
                    onClick={() =>
                      navigate(`/admin/dashboard/templates/edit/${t.id}`)
                    }
                    style={{ marginRight: "5px" }}
                  >
                    Edit
                  </button>
                  <button onClick={() => handleDelete(t.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                No information found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
