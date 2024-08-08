const expressAsyncHandler = require("express-async-handler");
const Blog = require("../model/blogModel");
const User = require("../model/userModel");

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
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    res.status(404);
    throw new Error("Blog not found");
  }

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
    {_id: id},
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
};
