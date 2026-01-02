import db from "../config/db.js";
import bcrypt from "bcryptjs";

export const User = {
  create: async (fullname, email, password) => {
    try {
      const hashed = await bcrypt.hash(password, 10);
      const [result] = await db.execute(
        "INSERT INTO users (fullname, email, password) VALUES (?, ?, ?)",
        [fullname, email, hashed]
      );
      return result;
    } catch (error) {
      throw error;
    }
  },

  findByEmail: async (email) => {
    try {
      const [rows] = await db.execute(
        "SELECT * FROM users WHERE email = ?", 
        [email]
      );
      return rows;
    } catch (error) {
      throw error;
    }
  },

  findById: async (id) => {
    try {
      const [rows] = await db.execute(
        "SELECT * FROM users WHERE id = ?", 
        [id]
      );
      return rows;
    } catch (error) {
      throw error;
    }
  },
};