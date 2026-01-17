import db from "../config/db.js";

export const Training = {
  create: (user_id, title, institution, completion_date, certificate_link) => {
    return db.query(
      `INSERT INTO training 
       (user_id, title, institution, completion_date, certificate_link)
       VALUES (?, ?, ?, ?, ?)`,
      [user_id, title, institution, completion_date, certificate_link]
    );
  },

  getAllByUser: (user_id) => {
    return db.query(
      "SELECT * FROM training WHERE user_id = ? ORDER BY completion_date DESC",
      [user_id]
    );
  },

  update: (id, user_id, title, institution, completion_date, certificate_link) => {
    return db.query(
      `UPDATE training 
       SET title = ?, institution = ?, completion_date = ?, certificate_link = ?
       WHERE id = ? AND user_id = ?`,
      [title, institution, completion_date, certificate_link, id, user_id]
    );
  },

  remove: (id, user_id) => {
    return db.query(
      "DELETE FROM training WHERE id = ? AND user_id = ?",
      [id, user_id]
    );
  },
};
