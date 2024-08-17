const expressAsyncHandler = require("express-async-handler");
const Product = require("../model/productModel");

// Create Product
const createProduct = expressAsyncHandler(async (req, res) => {
  const {
    name,
    sku,
    category,
    brand,
    quantity,
    price,
    description,
    image,
    regularPrice,
    color,
  } = req.body;

  //   Validation
  if (!name || !category || !brand || !quantity || !price || !description) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  // Create Product
  const product = await Product.create({
    name,
    sku,
    category,
    quantity,
    brand,
    price,
    description,
    image,
    regularPrice,
    color,
  });

  res.status(201).json(product);
});

// Get all Products
const getProducts = expressAsyncHandler(async (req, res) => {
  const products = await Product.find().sort("-createdAt");
  res.status(200).json(products);
});

// Get single product
const getProduct = expressAsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  res.status(200).json(product);
});

// Delete product
const deleteProduct = expressAsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  await product.deleteOne();
  res.status(200).json({ message: "Product deleted." });
});

// Update product
const updateProduct = expressAsyncHandler(async (req, res) => {
  const {
    name,
    category,
    brand,
    quantity,
    price,
    description,
    image,
    regularPrice,
    color,
  } = req.body;
  const { id } = req.params;

  const product = await Product.findById(id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    { _id: id },
    {
      name,
      category,
      brand,
      quantity,
      price,
      description,
      image,
      regularPrice,
      color,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json(updatedProduct);
});

// Review Product
const reviewProduct = expressAsyncHandler(async (req, res) => {
  const { star, review, reviewDate } = req.body;
  const { id } = req.params;

  // Validation
  if (star < 1) {
    res.status(400);
    throw new Error("Please add star and review");
  }

  const product = await Product.findById(id);

  // If product does not exist
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  // Update Rating
  product.ratings.push({
    star,
    review,
    reviewDate,
    name: req.user.name,
    userID: req.user._id,
  });

  product.save();

  res.status(200).json({ message: "Product review added." });
});

// Delete Review
const deleteReview = expressAsyncHandler(async (req, res) => {
  const { userID } = req.body;

  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(400);
    throw new Error("Product not found");
  }

  const newRatings = product.ratings.filter((rating) => {
    return rating.userID.toString() !== userID.toString();
  });

  product.ratings = newRatings;
  product.save();
  res.status(200).json({ message: "Product rating deleted" });
});

// Update Review
const updateReview = expressAsyncHandler(async (req, res) => {
  const { star, review, reviewDate, userID } = req.body;
  const { id } = req.params;

  //  Validation
  if (star < 1 || !review) {
    res.status(400);
    throw new Error("Please add star and review");
  }

  const product = await Product.findById(id);

  // Match User to review
  if (req.user._id.toString() !== userID) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedReview = await Product.findOneAndUpdate(
    { _id: product._id, "ratings.userId": mongoose.Types.ObjectId(userID) },
    {
      $set: {
        "ratings.$.star": Number(star),
        "ratings.$.review": review,
        "ratings.$.reviewData": reviewDate,
      },
    }
  );

  if (updatedReview) {
    res.status(200).json({ message: "Product review updated." });
  } else {
    res.status(400).json({ message: "Product review NOT updated." });
  }
});

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
  reviewProduct,
  deleteReview,
  updateReview
};
