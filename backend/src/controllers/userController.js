import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login attempt for:", email);

    /* ===== DATABASE LOGIN CHECK ===== */
    // findByEmail now returns rows directly (not [rows])
    const rows = await User.findByEmail(email);

    console.log("Rows found:", rows.length);

    if (rows.length === 0) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const user = rows[0];
    console.log("User found:", user.email);

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const token = jwt.sign(
      {
        id: user.id,
        name: user.fullname, 
        email: user.email
      },
      process.env.USER_JWT_SECRET, 
      { expiresIn: "7d" }
    );

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      message: "Login success",
      token,
      user: userWithoutPassword
    });

  } catch (err) {
    console.error("Login error details:", err);
    res.status(500).json({
      error: err.message,
      note: "Database query failed. Check connection."
    });
  }
};

export const register = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    const userExist = await User.findByEmail(email);
    if (userExist.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    await User.create(fullname, email, password);
    res.json({ message: "User registered successfully!" });

  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: err.message });
  }
};