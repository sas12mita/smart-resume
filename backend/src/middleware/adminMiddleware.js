import jwt from "jsonwebtoken";

export const adminAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(403).json({ msg: "No token provided" });

  jwt.verify(token, process.env.ADMIN_JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ msg: "Invalid token" });

    if (decoded.role !== "admin")
      return res.status(403).json({ msg: "Unauthorized" });

    next();
  });
};
