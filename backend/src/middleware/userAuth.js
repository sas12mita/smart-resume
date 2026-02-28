import jwt from "jsonwebtoken";

const userAuth = (req, res, next) => {
  console.log("🔥 userAuth hit");

  const authHeader = req.headers.authorization;
  console.log("Authorization Header:", authHeader);

  if (!authHeader) {
    console.log("❌ No auth header");
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  console.log("Extracted token:", token);

  try {
    const decoded = jwt.verify(token, process.env.USER_JWT_SECRET);
    console.log("✅ Token verified:", decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.log("❌ Token invalid:", err.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default userAuth;