import { useEffect, useState } from "react";
import styles from "./Navbar.module.scss";
import Logo from "../../../assets/Logo.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { TfiMenuAlt } from "react-icons/tfi";
import { MdOutlineCloseFullscreen } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import ServiceDropdown from "./Dropdown";
import {
  RESET_AUTH,
  getUser,
  logout,
} from "../../../redux/feactures/auth/authSlice";
import ShowOnLogin, { ShowOnLogout } from "../../hiddenLink/hiddenLink";

export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  

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

  useEffect(() => {
    if (!user) {
      dispatch(getUser());
    }
  }, [dispatch, user]);

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
                  {/* {isServiceDropdownOpen && <ServiceDropdown />} */}
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
              {/* <Link to="/send-a-request">Get a Quote</Link> */}
              <ShowOnLogin>
                <Link to="/" onClick={LogoutUser}>
                  Logout
                </Link>
              </ShowOnLogin>
              <ShowOnLogin>
                <Link to={user?.role === "customer" ? "/profile" : "/admin/dashboard/profile"}>
                  <span className={styles["profile-span"]}>
                    <img
                      src={user?.photo}
                      alt=""
                      className={styles["nav-img"]}
                    />
                    {user?.name && user.name.split(' ')[0]}
                  </span>
                </Link>
              </ShowOnLogin>
            </div>
            {/* <div className={styles["mobile-profile-container"]}>
            <ShowOnLogin>
                <Link to="/send-a-request">
                  <span className={styles["profile-span"]}>
                    <img
                      src={user?.photo}
                      alt={user?.name}
                      className={styles["nav-img"]}
                    />
                    {user?.name}
                  </span>
                </Link>
              </ShowOnLogin>
            </div> */}
          </nav>

          <div className={styles["menu-icon"]}>
            <TfiMenuAlt color="#ffa047" size={20} onClick={toggleMenu} />
          </div>
        </div>
      </header>
    </>
  );
}
