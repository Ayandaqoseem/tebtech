import axios from "axios";
import { toast } from "react-toastify";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/users/`;

// Helper function to handle errors
const handleError = (error) => {
  if (error.response) {
    return error.response.data.message || error.message;
  } else if (error.request) {
    return "No response received from server";
  } else {
    return error.message;
  }
};

// Register user
const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}register`, userData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(handleError(error));
  }
};

// Login user
const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}login`, userData);
    return response.data;
  } catch (error) {
    throw new Error(handleError(error));
  }
};

// Logout user
const logout = async () => {
  try {
    const response = await axios.get(`${API_URL}logout`);
    return response.data.message;
  } catch (error) {
    throw new Error(handleError(error));
  }
};

// Get login status
const getLoginStatus = async () => {
  try {
    const response = await axios.get(`${API_URL}get-login-status`);
    return response.data;
  } catch (error) {
    throw new Error(handleError(error));
  }
};

// Get user
const getUser = async () => {
  try {
    const response = await axios.get(`${API_URL}get-user`);
    return response.data;
  } catch (error) {
    toast.error(error);
    throw new Error(handleError(error));
  }
};

// Update user
const updateUser = async (userData) => {
  try {
    const response = await axios.patch(`${API_URL}update-user`, userData);
    return response.data;
  } catch (error) {
    throw new Error(handleError(error));
  }
};

// Update user photo
const updatePhoto = async (userData) => {
  const response = await axios.patch(API_URL + "update-photo", userData);
  return response.data;
};

// Forgot Password
const forgotPassword = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}forgot-password`, userData);
    return response.data.message;
  } catch (error) {
    throw new Error(handleError(error));
  }
};

// Reset Password
const resetPassword = async (userData, resetToken) => {
  try {
    const response = await axios.patch(
      `${API_URL}resetPassword/${resetToken}`,
      userData
    );
    return response.data.message;
  } catch (error) {
    throw new Error(handleError(error));
  }
};

// Google Login
const googleLogin = () => {
  window.location.href = `${BACKEND_URL}/api/auth/google`;
};

// Save Enquiry
const saveEnquiry = async (userData) => {
  const response = await axios.post(`${API_URL}saveEnquiry`, userData);
  console.log(response);
  return response.data;
};

// Add to wishlist
const addToWishlist = async (productData) => {
  const response = await axios.post(API_URL + "addToWishlist", productData);

  return response.data.message;
};

// Get wishlist
const getWishlist = async () => {
  const response = await axios.get(API_URL + "getWishlist");

  return response.data;
};

// Remove from wishlist
const removeFromWishlist = async (productId) => {
  const response = await axios.put(API_URL + `wishlist/${productId}`);

  return response.data.message;
};

// Service Review
const reviewService = async (id, formData) => {
  const response = await axios.patch(
    `${API_URL}service-review/${id}`,
    formData
  );
  return response.data.message;
};

// Delete Service Review
const deleteReviewService = async (id, formData) => {
  const response = await axios.patch(
    `${API_URL}delete-service-review/${id}`,
    formData
  );
  return response.data.message;
};

// Update Service Review
const updateReviewService = async (id, formData) => {
  const response = await axios.patch(
    `${API_URL}update-service-review/${id}`,
    formData
  );
  return response.data.message;
};

// Get all Service Review
const allReviews = async () => {
  const response = await axios.get(`${API_URL}service-reviews`);
  return response.data;
};

// Create newsletter
const newsletter = async (formData) => {
  const response = await axios.post(`${BACKEND_URL}/api/newsletter`, formData);

  return response.data;
};

// Delete newsletter
const unsubscribe = async (formData) => {
  const response = await axios.post(
    `${BACKEND_URL}/api/newsletter/unsubscribe`,
    formData
  );
  return response.data;
};

const authService = {
  register,
  login,
  logout,
  getLoginStatus,
  getUser,
  updateUser,
  updatePhoto,
  forgotPassword,
  resetPassword,
  googleLogin,
  saveEnquiry,
  addToWishlist,
  getWishlist,
  removeFromWishlist,
  reviewService,
  deleteReviewService,
  updateReviewService,
  allReviews,
  newsletter,
  unsubscribe,
};

export default authService;
