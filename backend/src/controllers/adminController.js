import jwt from "jsonwebtoken";

export const adminLogin = (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  

  return res.status(401).json({ msg: "Invalid admin credentials" });
};
