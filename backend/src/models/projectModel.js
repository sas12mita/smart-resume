import db from "../config/db.js";

export const Project = {
  /* ================= CREATE ================= */
  create: (user_id, title, description, link) => {
    return db.query(
      `INSERT INTO projects 
       (user_id, title, description, link)
       VALUES (?, ?, ?, ?)`,
      [user_id, title, description, link]
    );
  },

  /* ================= READ ALL BY USER ================= */
  getAllByUser: (user_id) => {
    return db.query(
      "SELECT * FROM projects WHERE user_id = ? ORDER BY created_at DESC",
      [user_id]
    );
  },

  /* ================= READ SINGLE ================= */
  getById: (id, user_id) => {
    return db.query(
      "SELECT * FROM projects WHERE id = ? AND user_id = ?",
      [id, user_id]
    );
  },

  /* ================= UPDATE ================= */
  update: (id, user_id, title, description, link) => {
    return db.query(
      `UPDATE projects 
       SET title = ?, description = ?, link = ?
       WHERE id = ? AND user_id = ?`,
      [title, description, link, id, user_id]
    );
  },

  /* ================= DELETE ================= */
  remove: (id, user_id) => {
    return db.query(
      "DELETE FROM projects WHERE id = ? AND user_id = ?",
      [id, user_id]
    );
  },
};
