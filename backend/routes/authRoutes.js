const express = require("express");
const passport = require("passport");
const { generateToken } = require("../utils/authUtils");
const router = express.Router();

// Google OAuth login route
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// Google OAuth callback route
router.get(
    '/google/callback',
    passport.authenticate('google', {
      failureRedirect: '/login', 
      session: true, 
    }),
    (req, res) => {
      const token = generateToken(req.user._id); 
      res.cookie('token', token, {
        path: '/',
        httpOnly: true,
        expires: new Date(Date.now() + 7000 * 86400),
      });
      res.redirect(`${process.env.FRONTEND_URL}/profile`);
    }
  );
module.exports = router;
