import db from "../config/db.js";
export const Bio = {
  getByUser: (user_id) => {
    return db.query(
      "SELECT * FROM bio WHERE user_id = ?",
      [user_id]
    );
  },

  create: (user_id, fullname, email, designation, phone, address, summary,photo) => {
    return db.query(
      `INSERT INTO bio 
       (user_id, fullname, email, designation, phone, address, summary,photo) 
       VALUES (?, ?, ?, ?, ?, ?, ?,?)`,
      [user_id, fullname, email, designation, phone, address, summary,photo]
    );
  },

  updateByUser: (user_id, fullname, email, designation, phone, address, summary,photo) => {
    return db.query(
      `UPDATE bio 
       SET fullname=?, email=?, designation=?, phone=?, address=?, summary=?,photo=? 
       WHERE user_id=?`,
      [fullname, email, designation, phone, address, summary,photo, user_id]
    );
  }
};
