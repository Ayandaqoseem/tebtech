import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import blogService from "./blogService";
import { toast } from "react-toastify";

const initialState = {
  //   isLoggedIn: false,
  blogs: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create Blog
export const createBlog = createAsyncThunk(
  "blog/createBlog",
  async (userData, thunkApi) => {
    try {
      return await blogService.createBlog(userData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create Blog
      .addCase(createBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.blogs.push(action.payload);
        console.log(action.payload);
        toast.success(action.payload);
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const {} = blogSlice.actions;

export default blogSlice.reducer;
