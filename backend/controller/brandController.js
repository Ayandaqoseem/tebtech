const expressAsyncHandler = require("express-async-handler");
const Category = require("../model/categoryModel");
const Brand = require("../model/brandModel");
const { default: slugify } = require("slugify");

// Create Brand
const createBrand = expressAsyncHandler(async (req, res) => {
  const { name, category } = req.body;
  if (!name || !category) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  const categoryExists = await Category.findOne({ name: category });
  if (!categoryExists) {
    res.status(400);
    throw new Error("Parent category not found.");
  }

  const brand = await Brand.create({
    name,
    slug: slugify(name),
    category,
  });
  if (brand) {
    res.status(201).json(brand);
  }
});

// Get brands
const getBrands = expressAsyncHandler(async (req, res) => {
  const brands = await Brand.find().sort("-createdAt");
  res.status(200).json(brands);
});

// Delete brands
const deleteBrand = expressAsyncHandler(async (req, res) => {
    const slug = req.params.slug.toLocaleLowerCase();
  const brand = await Brand.findOneAndDelete({ slug });
  if (!brand) {
    res.status(404);
    throw new Error("Brand not found");
  }
  res.status(200).json("Brand deleted.");
});

module.exports = {
  createBrand,
  getBrands,
  deleteBrand,
};
