import db from "../config/db.js";

const Project = {
  create: (data, callback) => {
    db.query("INSERT INTO projects SET ?", data, callback);
  },
  findAll: (callback) => {
    db.query("SELECT * FROM projects", callback);
  },
  findById: (id, callback) => {
    db.query("SELECT * FROM projects WHERE id = ?", [id], callback);
  },
  update: (id, data, callback) => {
    db.query("UPDATE projects SET ? WHERE id = ?", [data, id], callback);
  },
  delete: (id, callback) => {
    db.query("DELETE FROM projects WHERE id = ?", [id], callback);
  }
};

export default Project;
