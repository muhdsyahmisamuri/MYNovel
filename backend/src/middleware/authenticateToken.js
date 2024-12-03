export default function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ error: "Authorization Bearer Token is required" });
  }

  const token = authHeader.split(" ")[1];
  if (token !== process.env.SECRET_KEY) {
    return res.status(403).json({ error: "Invalid or expired token" });
  }

  next();
}
