import db from "../config/db.js";

const Language = {
  create: (data, callback) => {
    db.query("INSERT INTO languages SET ?", data, callback);
  },

  getAll: (user_id, callback) => {
    db.query("SELECT * FROM languages WHERE user_id = ?", [user_id], callback);
  },

  getById: (id, callback) => {
    db.query("SELECT * FROM languages WHERE id = ?", [id], callback);
  },

  update: (id, data, callback) => {
    db.query("UPDATE languages SET ? WHERE id = ?", [data, id], callback);
  },

  delete: (id, callback) => {
    db.query("DELETE FROM languages WHERE id = ?", [id], callback);
  }
};

export default Language;
