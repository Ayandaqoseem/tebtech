const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");
const GoogleUser = require("../model/googleModel");

const protect = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (token) {
      // Verify Token
      const verified = jwt.verify(token, process.env.JWT_SECRET);

      // Get User id from token
      const user = await User.findById(verified.id).select("-password");

      if (!user) {
        res.status(400);
        throw new Error("User not found");
      }

      req.user = user;
      next();
    } else if (req.isAuthenticated()) {
      // User is authenticated via Google OAuth
      const googleUser = await GoogleUser.findOne({ googleId: req.user.googleId });

      if (!googleUser) {
        res.status(400);
        throw new Error("Google user not found");
      }

      req.user = googleUser;
      next();
    } else {
      res.status(401);
      throw new Error("Not authorized, please login");
    }
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403); // 403 Forbidden
    throw new Error("Not authorized as an admin");
  }
};

module.exports = { protect, adminOnly };
