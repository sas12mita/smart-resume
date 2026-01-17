import db from "../config/db.js";

export const Hobby = {
  create: (user_id, hobby_name) => {
    return db.query(
      `INSERT INTO hobbies (user_id, hobby_name)
       VALUES (?, ?)`,
      [user_id, hobby_name]
    );
  },

  getAllByUser: (user_id) => {
    return db.query(
      "SELECT * FROM hobbies WHERE user_id = ? ORDER BY created_at DESC",
      [user_id]
    );
  },

  update: (id, user_id, hobby_name) => {
    return db.query(
      `UPDATE hobbies SET hobby_name = ?
       WHERE id = ? AND user_id = ?`,
      [hobby_name, id, user_id]
    );
  },

  remove: (id, user_id) => {
    return db.query(
      "DELETE FROM hobbies WHERE id = ? AND user_id = ?",
      [id, user_id]
    );
  },
};
