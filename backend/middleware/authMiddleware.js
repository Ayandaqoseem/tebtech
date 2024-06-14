const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");

const protect = asyncHandler(async (req, res, next) => {
  try {
    
    const token = req.cookies.token;

    if (!token) {
      res.status(400);
      throw new Error("Not authorized, please login");
    }

    //     Verify Token
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    // Get User id from token
    const user = await User.findById(verified.id).select("-password");


    if (!user) {
      res.status(400);
      throw new Error("User not found");
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401);
    throw new Error("Not authorized, please login");
  }
});

const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(400);
    throw new Error("Not authorized as an admin");
  }
};

module.exports = { protect, adminOnly };
