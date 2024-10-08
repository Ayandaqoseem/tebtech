import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import styles from "./AdminNavbar.module.scss";
import { selectUser } from "../../../redux/feactures/auth/authSlice";

const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "");

const AdminNavbar = () => {
  const user = useSelector(selectUser);
  const userName = user?.name;

  return (
    <div className={styles["main-admin-navbar"]}>
      <div className={styles.user}>
        <img
          src={user?.photo}
          alt="profile_photo"
          className={styles["admin-profile-img"]}
        />
        <h4>{userName}</h4>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to="/admin/dashboard/add-product" className={activeLink}>
              Create Product
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/dashboard/all-products" className={activeLink}>
              All Products
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/dashboard/create-blog" className={activeLink}>
              Create Blog
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/dashboard/get-blogs" className={activeLink}>
              All Blogs
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/dashboard/category" className={activeLink}>
              Categories
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/dashboard/brand" className={activeLink}>
              Brands
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/dashboard/orders" className={activeLink}>
              Orders
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/dashboard/coupon" className={activeLink}>
              Coupon
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminNavbar;
