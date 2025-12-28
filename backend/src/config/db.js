import mysql from "mysql2/promise";
import dotenv from "dotenv";
import seedAdminUser from "./seedAdminUser.js"

dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 10,
});

/* ---------- CONNECT & SEED ---------- */
db.getConnection()
  .then(async (connection) => {
    console.log("✅ MySQL Connected!");
    connection.release();

    // 🔥 AUTO SEED
    await seedAdminUser();
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err.message);
  });

export default db;
