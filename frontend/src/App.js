import { Routes, Route } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/home/Home";
import Navbar from "./components/navbar/menu/Navbar";
import NotFoundPage from "./pages/404/NotFoundPage";
import Footer from "./components/footer/Footer";
import { AnimatePresence } from "framer-motion";
import Services from "./pages/services/Services";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import Blog from "./pages/blog/Blog";
import Login from "./pages/auth/Login";
import ServiceSolarDetails from "./pages/services/ServiceSolarDetails";
import ServiceCctvDetails from "./pages/services/ServiceCctvDetails";
import Register from "./pages/auth/Register";
import Reset from "./pages/auth/Reset";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getLoginStatus } from "./redux/feactures/auth/authSlice";
import UserProfile from "./pages/profile/UserProfile";
import NewPassword from "./pages/auth/NewPassword";
import Request from "./components/request/Request";
import ShowOnLogin from "./components/hiddenLink/hiddenLink";
import AdminOnlyRoute from "./components/AdminOnlyRoute/AdminOnlyRoute";
import Admin from "./components/admin/Admin";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import SingleBlog from "./pages/blog/SingleBlog";
import Product from "./pages/shop/Product";
import ProductDetails from "./components/product/productDetails/ProductDetails";
import CheckoutDetails from "./pages/checkout/CheckoutDetails";
import CheckoutFlutterwave from "./pages/checkout/CheckoutFlutterwave";
import CheckoutSuccess from "./pages/checkout/CheckoutSuccess";
import OrderHistory from "./pages/orderHistory/OrderHistory";
import OrderDetails from "./pages/orderDetails/OrderDetails";
import Wallet from "./pages/wallet/Wallet";
import Wishlist from "./pages/wishlist/Wishlist";
import ReviewProduct from "./pages/review/reviewProduct/reviewProduct";
// import Cart from "./pages/cart/Cart";

function App() {
  axios.defaults.withCredentials = true;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLoginStatus());
  }, [dispatch]);
  return (
    <>
      <ToastContainer />
      <Navbar />
      <AnimatePresence>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/send-a-request" element={<Request />} />
          <Route path="/services" element={<Services />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />

          <Route
            path="/admin/dashboard/*"
            element={
              <AdminOnlyRoute>
                <Admin />
              </AdminOnlyRoute>
            }
          />
          <Route
            path="/service/solar-details"
            element={<ServiceSolarDetails />}
          />
          <Route
            path="/service/cctv-details"
            element={<ServiceCctvDetails />}
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blogs" element={<Blog />} />
          <Route path="/blog/:id" element={<SingleBlog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Reset />} />
          <Route path="/shop" element={<Product />} />
          <Route path="/product-details/:id" element={<ProductDetails />} />
          <Route
            path="/checkout-details"
            element={
              <ShowOnLogin>
                <CheckoutDetails />
              </ShowOnLogin>
            }
          />

          <Route
            path="/checkout-flutterwave"
            element={
              <ShowOnLogin>
                <CheckoutFlutterwave />
              </ShowOnLogin>
            }
          />
          <Route
            path="/checkout-success"
            element={
              <ShowOnLogin>
                <CheckoutSuccess />
              </ShowOnLogin>
            }
          />

          <Route
            path="/wishlist"
            element={
              <ShowOnLogin>
                <Wishlist />
              </ShowOnLogin>
            }
          />

<Route
            path="/review-product/:id"
            element={
              <ShowOnLogin>
                <ReviewProduct />
              </ShowOnLogin>
            }
          />

          <Route
            path="/order-history"
            element={
              <ShowOnLogin>
                <OrderHistory />
              </ShowOnLogin>
            }
          />
          <Route
            path="/order-details/:id"
            element={
              <ShowOnLogin>
                <OrderDetails />
              </ShowOnLogin>
            }
          />

          <Route
            path="profile"
            element={
              <ShowOnLogin>
                {" "}
                <UserProfile />{" "}
              </ShowOnLogin>
            }
          />

          <Route
            exact
            path="/resetpassword/:resetToken"
            element={<NewPassword />}
          />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AnimatePresence>
      <section>
        <Footer />
      </section>
    </>
  );
}

export default App;
