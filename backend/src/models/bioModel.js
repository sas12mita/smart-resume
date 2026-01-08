import db from "../config/db.js";

export const Bio = {
  getByUser: (user_id) => {
    return db
      .promise()
      .query("SELECT * FROM bio WHERE user_id = ?", [user_id]);
  },

  create: (user_id, fullname, email, designation, phone, address, summary) => {
    return db
      .promise()
      .query(
        `INSERT INTO bio 
         (user_id, fullname, email, designation, phone, address, summary) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [user_id, fullname, email, designation, phone, address, summary]
      );
  },

  updateByUser: (user_id, fullname, email, designation, phone, address, summary) => {
    return db
      .promise()
      .query(
        `UPDATE bio 
         SET fullname=?, email=?, designation=?, phone=?, address=?, summary=? 
         WHERE user_id=?`,
        [fullname, email, designation, phone, address, summary, user_id]
      );
  },
};
