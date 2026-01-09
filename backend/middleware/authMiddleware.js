import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {
  let token;

  // Check for Bearer token in headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract token from header string
      token = req.headers.authorization.split(" ")[1];

      // Verify token validity
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user data to request object (excluding password)
      req.user = await User.findById(decoded.id).select("-password");

      next(); // Proceed to protected route
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

export { protect };
