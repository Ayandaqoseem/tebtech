import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/feactures/auth/authSlice";
import blogReducer from "../redux/feactures/blog/blogSlice";
import categoryReducer from "../redux/feactures/categoryAndBrand/categoryAndBrandSlice";
import productReducer from "../redux/feactures/product/productSlice";
import filterReducer from "../redux/feactures/product/filterSlice";
import cartReducer from "../redux/feactures/product/cartSlice";
import checkoutReducer from "../redux/feactures/product/checkoutSlice";
import orderReducer from "../redux/feactures/product/orderSlice";
import couponReducer from "../redux/feactures/coupon/couponSlice";




export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    blog: blogReducer,
    category: categoryReducer,
    filter: filterReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
    order: orderReducer,
    coupon: couponReducer,
  },
});
