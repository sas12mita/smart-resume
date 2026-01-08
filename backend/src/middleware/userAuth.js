import jwt from "jsonwebtoken";

const userAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check header exists
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Extract token
  const token = authHeader.split(" ")[1];
  console.log(token);

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.USER_JWT_SECRET);

    // Attach user info to request
    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default userAuth;
