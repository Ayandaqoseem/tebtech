const express = require("express");
const { adminOnly, protect } = require("../middleware/authMiddleware");
const {
  createBlog,
  getBlogs,
  updateBlog,
  deleteBlog,
  getSingleBlog,
  blogLike,
  getSingleBlogLimiter,
} = require("../controller/blogController");

const router = express.Router();

router.post("/createBlog", protect, adminOnly, createBlog);
router.get("/getBlogs", getBlogs);
router.get("/getSingleBlog/:id", getSingleBlogLimiter, getSingleBlog);
router.patch("/updateBlog/:id", protect, adminOnly, updateBlog);
router.delete("/deleteBlog/:id", protect, adminOnly, deleteBlog);

// Blog Likes 
router.patch("/blogLike/:id", blogLike)

module.exports = router;
