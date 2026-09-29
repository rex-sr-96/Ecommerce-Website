import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // console.log("Authorization header:", authHeader);

  const token = authHeader?.split(" ")[1];

  // console.log("Extracted token:", token);
  // console.log("JWT_SECRET exists:", !!process.env.JWT_SECRET);

  if (!token) {
    return res.status(403).json({
      error: "A token is required for authentication",
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    console.log("Decoded token:", decoded);

    req.user = decoded;
  } catch (err) {
    console.log("JWT verification error:", err.message);

    return res.status(401).json({
      error: "Invalid Token",
    });
  }

  next();
};

export const isAdmin = (req, res, next) => {
  console.log("User in isAdmin:", req.user);

  if (req.user && req.user.role?.toLowerCase() === "admin") {
    return next();
  }

  return res.status(403).json({
    error: "Admin access required",
  });
};