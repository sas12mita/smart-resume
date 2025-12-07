import db from "../config/db.js";

const Experience = {
  create: (data, callback) => {
    const sql = "INSERT INTO experience SET ?";
    db.query(sql, data, callback);
  },

  findAll: (callback) => {
    db.query("SELECT * FROM experience", callback);
  },

  findById: (id, callback) => {
    db.query("SELECT * FROM experience WHERE id = ?", [id], callback);
  },

  update: (id, data, callback) => {
    db.query("UPDATE experience SET ? WHERE id = ?", [data, id], callback);
  },

  delete: (id, callback) => {
    db.query("DELETE FROM experience WHERE id = ?", [id], callback);
  }
};

export default Experience;
