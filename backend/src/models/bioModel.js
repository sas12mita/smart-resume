import db from "../config/db.js";

export const Bio = {
  create: (user_id, full_name, email, phone, address, summary) => {
    return db
      .promise()
      .query(
        "INSERT INTO bio (user_id, full_name, email, phone, address, summary) VALUES (?, ?, ?, ?, ?, ?)",
        [user_id, full_name, email, phone, address, summary]
      );
  },

  getByUser: (user_id) => {
    return db
      .promise()
      .query("SELECT * FROM bio WHERE user_id = ?", [user_id]);
  },

  update: (id, full_name, email, phone, address, summary) => {
    return db
      .promise()
      .query(
        "UPDATE bio SET full_name=?, email=?, phone=?, address=?, summary=? WHERE id=?",
        [full_name, email, phone, address, summary, id]
      );
  },
};
