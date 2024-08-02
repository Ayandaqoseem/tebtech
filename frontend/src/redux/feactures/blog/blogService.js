import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const API_URL = `${BACKEND_URL}/api/blogs/`;

// Create Blog
const createBlog = async (userData) => {
  const response = await axios.post(`${API_URL}createBlog`, userData);
  return response.data;
};

// Get all Blogs
const getBlogs = async () => {
  const response = await axios.get(`${API_URL}getBlogs`);
  return response.data;
};

// Get a Blog
const getSingleBlog = async (id) => {
  const response = await axios.get(`${API_URL}getSingleBlog/` + id);
  return response.data;
};

// Update Blog
const updateBlog = async (id, formData) => {
  const response = await axios.patch(`${API_URL}updateBlog/${id}`, formData);
  return response.data;
};

// Delete Blog
const deleteBlog = async (id) => {
  const response = await axios.delete(`${API_URL}deleteBlog/` + id);
  return response.data;
};

const blogService = {
  createBlog,
  getBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
};

export default blogService;
