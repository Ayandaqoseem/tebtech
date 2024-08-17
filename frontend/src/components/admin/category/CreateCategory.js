import React, { useState } from "react";
import { Card } from "../../card/Card";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../loader/Loader";
import { toast } from "react-toastify";
import {
  createCategory,
  getCategories,
} from "../../../redux/feactures/categoryAndBrand/categoryAndBrandSlice";
import "./Category.scss";

export default function CreateCategory({ reloadCategory }) {
  const [name, setName] = useState("");

  const { isLoading } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  const saveCat = async (e) => {
    e.preventDefault();
    if (name.length < 3) {
      return toast.error("Coupon must be up to 3 characters");
    }
    const formData = {
      name,
    };
    // console.log(formData);
    dispatch(createCategory(formData));
    dispatch(getCategories());
    setName("");
    reloadCategory();
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="--mb2 create-cat-container">
        <h3>Create Category</h3>
        <p>
          Use the form to <b>Create a Category.</b>
        </p>
        <Card cardClass={"card"}>
          <br />
          <form className="cat-form" onSubmit={saveCat}>
            <label>Category Name:</label>
            <input
              type="text"
              placeholder="Category name"
              name="name"
              className="cat-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <div className="--my">
              <button type="submit" className="--btn --btn-primary">
                Save Category
              </button>
            </div>
          </form>
        </Card>
      </div>
    </>
  );
}
