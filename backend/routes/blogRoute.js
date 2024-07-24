const express = require("express");
const { adminOnly, protect } = require("../middleware/authMiddleware");
const { createBlog, getBlogs, updateBlog, deleteBlog } = require("../controller/blogController");




const router = express.Router();



router.post("/createBlog", protect, adminOnly, createBlog);
router.get("/getBlogs",  getBlogs);
router.patch("/updateBlog/:id", protect, adminOnly, updateBlog);
router.delete("/deleteBlog/:id", protect, adminOnly, deleteBlog);

module.exports = router;