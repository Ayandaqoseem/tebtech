import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import blogService from "./blogService";
import { toast } from "react-toastify";

const initialState = {
  //   isLoggedIn: false,
  blogs: [],
  blog: null,
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

// Get All Blogs
export const getBlogs = createAsyncThunk(
  "blog/getBlogs",
  async (_, thunkApi) => {
    try {
      return await blogService.getBlogs();
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

// Get a Blog
export const getSingleBlog = createAsyncThunk(
  "blog/getSingleBlog",
  async (id, thunkApi) => {
    try {
      return await blogService.getSingleBlog(id);
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

// Update Blog
export const updateBlog = createAsyncThunk(
  "blog/updateBlog",
  async ({ id, formData }, thunkApi) => {
    try {
      return await blogService.updateBlog(id, formData);
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

// Delete Blog
export const deleteBlog = createAsyncThunk(
  "blog/deleteBlog",
  async (id, thunkApi) => {
    try {
      return await blogService.deleteBlog(id);
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
        // console.log(action.payload);
        toast.success(action.payload);
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // Get Blogs
      .addCase(getBlogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.blogs = action.payload;
        // console.log(action.payload);
        toast.success(action.payload);
      })
      .addCase(getBlogs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // Get a Blog
      .addCase(getSingleBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.blog = action.payload;
        // console.log(action.payload);
        toast.success(action.payload);
      })
      .addCase(getSingleBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // Update Blog
      .addCase(updateBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const updatedBlog = action.payload;
        const index = state.blogs.findIndex(
          (blog) => blog._id === updatedBlog._id
        );
        if (index !== -1) {
          state.blogs[index] = updatedBlog;
        }
        console.log(action.payload);
        toast.success(action.payload);
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

           // Delete Blog
           .addCase(deleteBlog.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(deleteBlog.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            const updatedBlog = action.payload;
            const index = state.blogs.findIndex(
              (blog) => blog._id === updatedBlog._id
            );
            if (index !== -1) {
              state.blogs[index] = updatedBlog;
            }
            console.log(action.payload);
            toast.success(action.payload);
          })
          .addCase(deleteBlog.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload);
          })
  },
});

export const {} = blogSlice.actions;

export default blogSlice.reducer;
