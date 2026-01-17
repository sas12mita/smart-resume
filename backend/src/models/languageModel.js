import db from "../config/db.js";

export const Language = {
  create: (user_id, language_name, proficiency) => {
    return db.query(
      `INSERT INTO languages (user_id, language_name, proficiency)
       VALUES (?, ?, ?)`,
      [user_id, language_name, proficiency]
    );
  },

  getAllByUser: (user_id) => {
    return db.query(
      "SELECT * FROM languages WHERE user_id = ? ORDER BY created_at DESC",
      [user_id]
    );
  },

  getById: (id, user_id) => {
    return db.query(
      "SELECT * FROM languages WHERE id = ? AND user_id = ?",
      [id, user_id]
    );
  },

  update: (id, user_id, language_name, proficiency) => {
    return db.query(
      `UPDATE languages 
       SET language_name = ?, proficiency = ?
       WHERE id = ? AND user_id = ?`,
      [language_name, proficiency, id, user_id]
    );
  },

  remove: (id, user_id) => {
    return db.query(
      "DELETE FROM languages WHERE id = ? AND user_id = ?",
      [id, user_id]
    );
  },
};
