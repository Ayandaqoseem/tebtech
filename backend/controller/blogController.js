const expressAsyncHandler = require("express-async-handler");
const Blog = require("../model/blogModel");
const User = require("../model/userModel");
const redisClient = require("../redisClient");
const rateLimit = require("express-rate-limit")


// Rate Limiting Middleware
const getSingleBlogLimiter = rateLimit({
  windowMs: 15*60*1000,
  max:100,
  message: "Too many request from this IP, please try again after 15 minutes",
  keyGenerator: (req) => req.ip,
})

// const { postToAll } = require("../utils/socialMediaPost");

// Create Blog Post
const createBlog = expressAsyncHandler(async (req, res) => {
  const {
    title,
    textDescription,
    photo,
    video,
    author,
    tags,
    views,
    likes,
    comments,
    isPublish,
  } = req.body;

  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("No User Found");
  }

  if (!title || !textDescription) {
    res.status(400);
    throw new Error("Please provide title and text description");
  }

  try {
    const blog = new Blog({
      title,
      textDescription,
      photo,
      video,
      author: user._id,
      tags,
      views,
      likes,
      comments,
      isPublish,
      author,
    });

    await blog.save();

    // If the blog is published, post to social media
    // if (isPublish) {
    //   const content = `${title}: ${textDescription}`;
    //   await postToAll(content, photo);
    // }

    res.status(201).json(blog);
  } catch (error) {
    res.status(500);
    throw new Error(`Server Error: ${error.message}`);
  }
});

// Get All Blog Post
const getBlogs = expressAsyncHandler(async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.status(200).json(blogs);
});

// Get Single Blog Post
const getSingleBlog = expressAsyncHandler(async (req, res) => {
  const blogId = req.params.id;
  const ipKey = `blog:${blogId}:ip:${req.ip}`;
  const viewsKey = `blog:${blogId}:views`;

  // Check if this IP has already viewed this blog
  const hasViewed = await redisClient.get(ipKey);

  if (!hasViewed) {
    // Increment views in Redis if not viewed
    await redisClient.incr(viewsKey);

    // Mark this IP as having viewed the blog
    await redisClient.set(ipKey, 'viewed', 'EX', 24 * 60 * 60); 
  }

  // Get updated views count from Redis
  let views = await redisClient.get(viewsKey);
  views = parseInt(views) || 0; 

  // Fetch blog data
  const blog = await Blog.findById(blogId);

  if (!blog) {
    res.status(404);
    throw new Error("Blog not found");
  }

  
  // Update blog with the current views from Redis
  blog.views = views;
  await blog.save();

  res.status(200).json(blog);
});

// Update Blog
const updateBlog = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  const {
    title,
    textDescription,
    photo,
    video,
    tags,
    views,
    likes,
    comments,
    isPublished,
  } = req.body;

  const blog = await Blog.findById(id);
  if (!blog) {
    res.status(400);
    throw new Error("Blog not found");
  }

  // Update Blog
  const updatedBlog = await Blog.findByIdAndUpdate(
    { _id: id },
    {
      title,
      textDescription,
      photo,
      video,
      tags,
      views,
      likes,
      comments,
      isPublished,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json(updatedBlog);
});

// Delete Blog
const deleteBlog = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  const blog = await Blog.findByIdAndDelete({ _id: id });
  if (!blog) {
    throw new Error("Blog not found");
  }
  res.status(200).json({
    message: "Blog deleted.",
  });
});

// Blog Likes
const blogLike = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  const blog = await Blog.findById(id);

  if (!blog) {
    throw new Error("Blog not found");
  }

  const likedIndex = blog.likedBy.indexOf(userId);

  if (likedIndex === -1) {
    blog.likes += 1;
    blog.likedBy.push(userId);
  } else {
    blog.likes -= 1;
    blog.likedBy.splice(likedIndex, 1);
  }

  await blog.save();
  res.status(200).json(blog);
});

module.exports = {
  createBlog,
  getBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
  blogLike,
  getSingleBlogLimiter,
};
