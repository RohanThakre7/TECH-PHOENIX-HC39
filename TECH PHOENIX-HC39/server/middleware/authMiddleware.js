const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Import User model

exports.protect = async (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({ msg: "Authorization header is missing." });
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user by ID and exclude the password field
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ msg: "User not found." });
    }

    // Attach user object to req for access in the route
    req.user = user;

    next();
  } catch (error) {
    console.error("Token error:", error);
    return res.status(401).json({ msg: "Token is not valid." });
  }
};

// Middleware to check if the user is a mentor
exports.isMentor = (req, res, next) => {
  if (req.user.userType !== "mentor") {
    return res.status(403).json({
      msg: "Access denied. Only mentors are allowed to perform this action.",
    });
  }
  next();
};
