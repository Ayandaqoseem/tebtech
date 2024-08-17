import React, { useEffect } from "react";
import CategoryList from "./CategoryList";
import CreateCategory from "./CreateCategory";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../../redux/feactures/categoryAndBrand/categoryAndBrandSlice";

const Category = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);

  const reloadCategory = () => {
    dispatch(getCategories());
  };
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <section>
      <div className="gen-container coupon">
        <CreateCategory reloadCategory={reloadCategory} />
        <CategoryList />
      </div>
    </section>
  );
};

export default Category;
