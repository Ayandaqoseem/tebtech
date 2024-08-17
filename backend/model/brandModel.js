const mongoose = require("mongoose");
const slugify = require("slugify");

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: "Name is required",
      minlength: [2, "Too short"],
      maxlength: [32, "Too long"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Generate a unique slug using the name and category
brandSchema.pre("save", function (next) {
    this.slug = slugify(`${this.name}-${this.category}`, { lower: true });
    next();
  });

const Brand = mongoose.model("Brand", brandSchema);
module.exports = Brand;
