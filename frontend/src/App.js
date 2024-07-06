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
import Profile from "./pages/profile/Profile";

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
          <Route path="/services" element={<Services />} />
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
          <Route path="/blog" element={<Blog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Reset />} />
          <Route path="/profile" element={<Profile />} />

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
