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
  getCart,
  saveCart,
  clearCart,
  addToWishlist,
  getWishlist,
  removeFromWishlist,
  reviewService,
  deleteReviewService,
  updateReviewService,
  allReviews,
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
router.patch("/update-photo", protect, updatePhoto);
router.patch("/change-password", protect, changePassword);
router.post("/forgot-password", forgotPassword);
router.patch("/resetPassword/:resetToken", resetPassword);

router.post("/saveEnquiry", saveEnquiry);

// cart
router.get("/getCart", protect, getCart);
router.patch("/saveCart", protect, saveCart);
router.patch("/clearCart", protect, clearCart);

// wishlist
router.post("/addToWishlist", protect, addToWishlist);
router.get("/getWishlist", protect, getWishlist);
router.put("/wishlist/:productId", protect, removeFromWishlist);


// Service Review
router.patch("/service-review/:id", protect, reviewService);
router.patch("/delete-service-review/:id", protect, deleteReviewService);
router.patch("/update-service-review/:id", protect, updateReviewService);
router.get("/service-reviews", allReviews);

module.exports = router;
