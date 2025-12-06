import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    const [userExist] = await User.findByEmail(email);
    if (userExist.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    await User.create(fullname, email, password);
    res.json({ message: "User registered successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [rows] = await User.findByEmail(email);
    if (rows.length === 0)
      return res.status(400).json({ message: "Invalid email" });

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match)
      return res.status(400).json({ message: "Incorrect password" });

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ message: "Login success", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
