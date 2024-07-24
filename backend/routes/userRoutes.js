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
  forgotPassword,
  resetPassword,
} = require("../controller/userConroller");
const { protect } = require("../middleware/authMiddleware");
const { saveEnquiry } = require("../controller/enquiryController");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/get-user", protect, getUser);
router.get("/get-login-status", getLoginStatus);
router.patch("/update-user", protect, updateUser);
router.patch("/update-photo", protect, updatePhoto)
router.patch("/change-password", protect, changePassword);
router.post("/forgot-password", forgotPassword);
router.patch("/resetPassword/:resetToken", resetPassword )




router.post("/saveEnquiry", saveEnquiry); 

module.exports = router;
