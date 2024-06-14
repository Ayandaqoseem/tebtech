import { Routes, Route } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify"
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
import Login from "./pages/auth/Login"
import ServiceSolarDetails from "./pages/services/ServiceSolarDetails";
import ServiceCctvDetails from "./pages/services/ServiceCctvDetails";
import Register from "./pages/auth/Register";
import axios from "axios";


function App() {
  axios.defaults.withCredentials = true;
  
  return (
    <>
    <ToastContainer />
      <Navbar />
      <AnimatePresence>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/service/solar-details" element={<ServiceSolarDetails /> } />
          <Route path="/service/cctv-details" element={<ServiceCctvDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

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
