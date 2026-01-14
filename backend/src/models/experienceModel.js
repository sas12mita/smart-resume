import db from "../config/db.js";

export const Experience = {

  /* ================= CREATE ================= */
  create: (user_id, company, city, role, start_date, end_date, description) => {
    return db.query(
      `INSERT INTO experience 
       (user_id, company, city, role, start_date, end_date, description)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [user_id, company, city, role, start_date, end_date, description]
    );
  },

  /* ================= READ ALL BY USER ================= */
  getAllByUser: (user_id) => {
    return db.query(
      "SELECT * FROM experience WHERE user_id = ? ORDER BY start_date DESC",
      [user_id]
    );
  },

  /* ================= READ SINGLE ================= */
  getById: (id, user_id) => {
    return db.query(
      "SELECT * FROM experience WHERE id = ? AND user_id = ?",
      [id, user_id]
    );
  },

  /* ================= UPDATE ================= */
  update: (id, user_id, company, city, role, start_date, end_date, description) => {
    return db.query(
      `UPDATE experience 
       SET company = ?, city = ?, role = ?, start_date = ?, end_date = ?, description = ?
       WHERE id = ? AND user_id = ?`,
      [company, city, role, start_date, end_date, description, id, user_id]
    );
  },

  /* ================= DELETE ================= */
  remove: (id, user_id) => {
    return db.query(
      "DELETE FROM experience WHERE id = ? AND user_id = ?",
      [id, user_id]
    );
  },
};
