import db from "../config/db.js";

const Hobby = {
  create: (data, callback) => {
    db.query("INSERT INTO hobbies SET ?", data, callback);
  },

  getAll: (user_id, callback) => {
    db.query("SELECT * FROM hobbies WHERE user_id = ?", [user_id], callback);
  },

  getById: (id, callback) => {
    db.query("SELECT * FROM hobbies WHERE id = ?", [id], callback);
  },

  update: (id, data, callback) => {
    db.query("UPDATE hobbies SET ? WHERE id = ?", [data, id], callback);
  },

  delete: (id, callback) => {
    db.query("DELETE FROM hobbies WHERE id = ?", [id], callback);
  }
};

export default Hobby;
