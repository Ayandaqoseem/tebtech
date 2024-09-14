import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../loader/Loader";
import {
  createProduct,
  selectIsLoading,
} from "../../../redux/feactures/product/productSlice";
import ProductForm from "../productForm/ProductForm";

import "./AddProduct.scss";
import { toast } from "react-toastify";
import {
  getBrands,
  getCategories,
} from "../../../redux/feactures/categoryAndBrand/categoryAndBrandSlice";

const initialState = {
  name: "",
  category: "",
  brand: "",
  quantity: "",
  price: "",
  color: "",
  regularPrice: "",
  newItem: false
};

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState(initialState);
  const [productImage, setProductImage] = useState([]);
  const [files, setFiles] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const [description, setDescription] = useState("");

  const isLoading = useSelector(selectIsLoading);

  const { name, category, brand, price, quantity, color, regularPrice, newItem } =
    product;
  const { categories, brands } = useSelector((state) => state.category);

  console.log("IsNewItem", newItem);
  
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getBrands());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleInputCheck = (e) => {
    const { name, checked } = e.target;
    setProduct({ ...product, [name]: checked });
  }

  const generateKSKU = (category) => {
    const letter = category.slice(0, 3).toUpperCase();
    const number = Date.now();
    const sku = letter + "-" + number;
    return sku;
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    if (files.length < 1) {
      return toast.info("Please add an image");
    }

    const formData = {
      name: name,
      sku: generateKSKU(category),
      category: category,
      brand: brand,
      color: color,
      quantity: Number(quantity),
      regularPrice: regularPrice,
      price: price,
      description: description,
      image: files,
      newItem
    };

    

    await dispatch(createProduct(formData));

    navigate("/admin/dashboard/all-products");
  };
  const [filteredBrands, setFilteredBrands] = useState([]);
  function filterBrands(selectedCategoryName) {
    const newBrands = brands.filter(
      (brand) => brand.category === selectedCategoryName
    );
    setFilteredBrands(newBrands);
  }

  useEffect(() => {
    filterBrands(category);
    // console.log(filteredBrands);
  }, [category]);

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Add New Product</h3>

      <ProductForm
        files={files}
        setFiles={setFiles}
        product={product}
        productImage={productImage}
        imagePreview={imagePreview}
        setImagePreview={setImagePreview}
        description={description}
        setDescription={setDescription}
        handleInputChange={handleInputChange}
        saveProduct={saveProduct}
        categories={categories}
        filteredBrands={filteredBrands}
        isEditing={false}
        handleInputCheck={handleInputCheck}
      />
    </div>
  );
};

export default AddProduct;
