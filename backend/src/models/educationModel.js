import db from "../config/db.js";

export const Education = {

  /* ================= CREATE ================= */
  create: (user_id, degree, institution, city, start_date, end_date) => {
    return db.query(
      `INSERT INTO education 
       (user_id, degree, institution, city, start_date, end_date)
       VALUES (?, ?, ?, ?, ?, ?)`, // Fixed: Was 5 question marks, now 6 to match 6 columns
      [user_id, degree, institution, city, start_date, end_date]
    );
  },

  /* ================= READ ALL BY USER ================= */
  getAllByUser: (user_id) => {
    return db.query(
      "SELECT * FROM education WHERE user_id = ? ORDER BY start_date DESC",
      [user_id]
    );
  },

  /* ================= READ SINGLE ================= */
  getById: (id, user_id) => {
    return db.query(
      "SELECT * FROM education WHERE id = ? AND user_id = ?",
      [id, user_id]
    );
  },

  /* ================= UPDATE ================= */
  update: (id, user_id, degree, institution, city, start_date, end_date) => {
    return db.query(
      `UPDATE education 
       SET degree = ?, institution = ?, city = ?, start_date = ?, end_date = ?
       WHERE id = ? AND user_id = ?`,
      [degree, institution, city, start_date, end_date, id, user_id]
    );
  },

  /* ================= DELETE ================= */
  remove: (id, user_id) => {
    return db.query(
      "DELETE FROM education WHERE id = ? AND user_id = ?",
      [id, user_id]
    );
  },
};