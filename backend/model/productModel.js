const mongoose = require("mongoose");

// const ratingSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   star: { type: Number, required: true },
//   review: { type: String, required: true },
//   reviewDate: { type: Date, required: true },
// }
// );

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      trim: true,
    },
    sku: {
      type: String,
      required: true,
      default: "SKU",
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Please add a category"],
      trim: true,
    },
    brand: {
      type: String,
      required: [true, "Please add a brand"],
      trim: true,
    },
    color: {
      type: String,
    //   required: [true, "Please add a color"],
      default: "As seen",
      trim: true,
      set: function(value) {
        return value === "" ? "As seen" : value;
      },
    },
    quantity: {
      type: Number,
      required: [true, "Please add a quantity"],
      trim: true,
    },
    sold: {
      type: Number,
      default: 0,
      trim: true,
    },
    price: {
      type: Number,
      default: 0,
      trim: true,
    },
    regularPrice: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
      trim: true,
    },
    image: {
      type: [String],
    },
    ratings: {
      type: [Object],
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
