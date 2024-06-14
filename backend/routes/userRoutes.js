const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  getLoginStatus,
  updateUser,
  updatePhoto,
  changePassword,
} = require("../controller/userConroller");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/get-user", protect, getUser);
router.get("/get-login-status", getLoginStatus);
router.patch("/update-user", protect, updateUser);
router.patch("/update-photo", protect, updatePhoto)
router.patch("/change-password", protect, changePassword);

module.exports = router;
