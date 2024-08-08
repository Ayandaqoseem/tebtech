const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100
    },
    textDescription: {
      type: String,
      required: true,
      trim: true,
    },
    photo: {
      type: String,
      trim: true,
    },
    video: {
      type: String,
      trim: true,
    },
    author: {
      type: String,
      default: "Admin"
      // type: mongoose.Schema.Types.ObjectId,
      // ref: 'User',
      // required: true
    },
    // authorAdmin: {
    //   t
    // },
    tags: [
      {
        type: String,
        trim: true,
      }
    ],
    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
    likedBy: [String],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
      }
    ],
    isPublished: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
