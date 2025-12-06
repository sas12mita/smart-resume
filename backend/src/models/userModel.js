import db from "../config/db.js";
import bcrypt from "bcryptjs";

export const User = {
  create: async (fullname, email, password) => {
    const hashed = await bcrypt.hash(password, 10);
    return db
      .promise()
      .query(
        "INSERT INTO users (fullname, email, password) VALUES (?, ?, ?)",
        [fullname, email, hashed]
      );
  },

  findByEmail: (email) => {
    return db.promise().query("SELECT * FROM users WHERE email = ?", [email]);
  },

  findById: (id) => {
    return db.promise().query("SELECT * FROM users WHERE id = ?", [id]);
  },
};
