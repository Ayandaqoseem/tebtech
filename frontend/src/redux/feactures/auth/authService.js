import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/users/`;

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL + "register", userData, {
    withCredentials: true,
  });
  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);
  return response.data;
};

// Logout user
const logout = async () => {
  const response = await axios.get(API_URL + "logout");
  return response.data.message;
};

// Get login status
const getLoginStatus = async () => {
  const response = await axios.get(API_URL + "get-login-status");
  return response.data;
};

// Get user
const getUser = async () => {
  const response = await axios.get(API_URL + "get-user");
  return response.data;
};

// Update user
const updateUser = async (userData) => {
  const response = await axios.patch(API_URL + "update-user", userData);
  return response.data;
};
// Update user photo
const updatePhoto = async (userData) => {
  const response = await axios.patch(API_URL + "update-photo", userData);
  return response.data;
};

// Forgot Password
const forgotPassword = async (userData) => {
  const response = await axios.post(API_URL + "forgot-password", userData);
  return response.data.message;
};

// Reset Password
const resetPassword = async(userData, resetToken) => {
  const response = await axios.patch(
    `${API_URL}resetPassword/${resetToken}`,
    userData
  );

  return response.data.message
}

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
};

export default authService;
