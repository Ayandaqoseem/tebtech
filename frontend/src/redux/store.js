import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/feactures/auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
