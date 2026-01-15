import db from "../config/db.js";

export const Skill = {
  /* ================= CREATE ================= */
  create: (user_id, skill_name, skill_level) => {
    return db.query(
      `INSERT INTO skills 
       (user_id, skill_name, skill_level)
       VALUES (?, ?, ?)`,
      [user_id, skill_name, skill_level]
    );
  },

  /* ================= READ ALL BY USER ================= */
  getAllByUser: (user_id) => {
    return db.query(
      "SELECT * FROM skills WHERE user_id = ? ORDER BY created_at DESC",
      [user_id]
    );
  },

  /* ================= READ SINGLE ================= */
  getById: (id, user_id) => {
    return db.query(
      "SELECT * FROM skills WHERE id = ? AND user_id = ?",
      [id, user_id]
    );
  },

  /* ================= UPDATE ================= */
  update: (id, user_id, skill_name, skill_level) => {
    return db.query(
      `UPDATE skills 
       SET skill_name = ?, skill_level = ?
       WHERE id = ? AND user_id = ?`,
      [skill_name, skill_level, id, user_id]
    );
  },

  /* ================= DELETE ================= */
  remove: (id, user_id) => {
    return db.query(
      "DELETE FROM skills WHERE id = ? AND user_id = ?",
      [id, user_id]
    );
  },
};
