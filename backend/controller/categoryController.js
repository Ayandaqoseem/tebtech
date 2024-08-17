const expressAsyncHandler = require("express-async-handler");
const Category = require("../model/categoryModel");
const slugify = require("slugify");

const createCategory = expressAsyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400);
    throw new Error("Please fill in category name");
  }

  const categoryExists = await Category.findOne({ name });

  if (categoryExists) {
    res.status(400);
    throw new Error("Category name already exist.");
  }

  const category = await Category.create({
    name,
    slug: slugify(name),
  });

  if (category) {
    res.status(201).json(category);
  }
});

const getCategories = expressAsyncHandler(async(req, res) => {
    const categories = await Category.find().sort("-createdAt")
    res.status(200).json(categories)
})

const deleteCategory = expressAsyncHandler(async(req, res) => {
    const slug = req.params.slug.toLocaleLowerCase();
  
    const category = await Category.findOneAndDelete({ slug })
    console.log(category);
    
    if(!category) {
        res.status(404)
        throw new Error("Category not found")
    }
    res.status(200).json({ message: "Category deleted."})
})

module.exports = {
  createCategory,
  getCategories,
  deleteCategory,
};
