import { useState } from "react";
import styles from "./Navbar.module.scss";
import Logo from "../../../assets/Logo.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { TfiMenuAlt } from "react-icons/tfi";
import { MdOutlineCloseFullscreen } from "react-icons/md";
import { useDispatch } from "react-redux";
import ServiceDropdown from "./Dropdown";
import { RESET_AUTH, logout } from "../../../redux/feactures/auth/authSlice";
import ShowOnLogin, { ShowOnLogout } from "../../hiddenLink/hiddenLink";

export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    setTimeout(() => {
      setIsServiceDropdownOpen(true);
    }, 200);
  };

  const handleMouseLeave = () => {
    setIsServiceDropdownOpen(false);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const hideMenu = () => {
    setShowMenu(false);
  };

  const LogoutUser = async () => {
    await dispatch(logout());
    dispatch(RESET_AUTH());
    navigate("/login");
  };

  return (
    <>
      <header className={styles.fixed}>
        <div className={styles.wrapper}>
          <Link to="/">
            <span>
              <motion.img
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                src={Logo}
                alt="Logo"
                style={{ height: "70px" }}
              />
            </span>
          </Link>
          <nav
            className={
              showMenu ? `${styles["show-nav"]}` : `${styles["hide-nav"]}`
            }
          >
            <div
              className={
                showMenu
                  ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}`
                  : `${styles["nav-wrapper"]}`
              }
              onClick={hideMenu}
            />
            <ul onClick={hideMenu}>
              <li className={styles["logo-mobile"]}>
                {/* <motion.img
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                src={Logo}
                alt="Logo"
              /> */}
                <MdOutlineCloseFullscreen size={20} color="#ffffff" />
              </li>
              <li>
                <NavLink
                  to="/services"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  Services
                  {isServiceDropdownOpen && <ServiceDropdown />}
                </NavLink>
              </li>
              <li>
                <NavLink to="/about">About us</NavLink>
              </li>
              <li>
                <NavLink to="/contact">Contact</NavLink>
              </li>
              <li>
                <NavLink to="/blog">Blog</NavLink>
              </li>
            </ul>
            <div className={styles["header-right"]}>
              <ShowOnLogout>
                <NavLink to="/login">Login</NavLink>
              </ShowOnLogout>
              <ShowOnLogin>
                <Link to="/" onClick={LogoutUser}>
                  Logout
                </Link>
              </ShowOnLogin>
              <Link to="/get-quote">Get a Quote</Link>
            </div>
          </nav>

          <div className={styles["menu-icon"]}>
            <TfiMenuAlt color="#ffa047" size={20} onClick={toggleMenu} />
          </div>
        </div>
      </header>
    </>
  );
}
