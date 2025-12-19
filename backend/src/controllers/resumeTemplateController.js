import db from "../config/db.js";

// GET all templates
export const getResumeTemplates = (req, res) => {
  db.query("SELECT * FROM resume_templates", (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data);
  });
};

// GET single template
export const getResumeTemplate = (req, res) => {
  db.query(
    "SELECT * FROM resume_templates WHERE id=?",
    [req.params.id],
    (err, data) => {
      if (err) return res.status(500).json(err);
      res.json(data[0]);
    }
  );
};

// CREATE template
export const createResumeTemplate = (req, res) => {
  const { template_key, title, status } = req.body;
  const thumbnail = req.file ? `/uploads/templates/${req.file.filename}` : null;
  console.log("BODY:", req.body);
  console.log("FILE:", req.file);
  const q = `
    INSERT INTO resume_templates (template_key, title, thumbnail, status)
    VALUES (?,?,?,?)
  `;

  db.query(q, [template_key, title, thumbnail, status], err => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Template created" });
  });
};

// UPDATE template
export const updateResumeTemplate = (req, res) => {
  const { title, status } = req.body;
  const thumbnail = req.file ? `/uploads/templates/${req.file.filename}` : req.body.oldThumbnail;

  const q = `
    UPDATE resume_templates
    SET title=?, thumbnail=?, status=?
    WHERE id=?
  `;
  db.query(q, [title, thumbnail, status, req.params.id], err => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Template updated" });
  });
};

// DELETE template
export const deleteResumeTemplate = (req, res) => {
  db.query(
    "DELETE FROM resume_templates WHERE id=?",
    [req.params.id],
    (err, data) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Template deleted" });
    }
  );
};
