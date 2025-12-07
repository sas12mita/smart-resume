import db from "../config/db.js";

const Training = {
  create: (data, callback) => {
    db.query("INSERT INTO training SET ?", data, callback);
  },
  findAll: (callback) => {
    db.query("SELECT * FROM training", callback);
  },
  findById: (id, callback) => {
    db.query("SELECT * FROM training WHERE id = ?", [id], callback);
  },
  update: (id, data, callback) => {
    db.query("UPDATE training SET ? WHERE id = ?", [data, id], callback);
  },
  delete: (id, callback) => {
    db.query("DELETE FROM training WHERE id = ?", [id], callback);
  }
};

export default Training;
