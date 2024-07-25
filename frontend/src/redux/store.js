import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/feactures/auth/authSlice";
import blogReducer from "../redux/feactures/blog/blogSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    blog: blogReducer
  },
});
