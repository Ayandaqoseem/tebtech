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
    <div className={styles.navbar}>
      <div className={styles.user}>
        <img src={user?.photo} alt="profile_photo" className={styles["admin-profile-img"]} />
        <h4>{userName}</h4>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to="/admin/dashboard/create-blog" className={activeLink}>
              Create Blog
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/all-products" className={activeLink}>
              All Products
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/add-product" className={activeLink}>
              Add Product
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/orders" className={activeLink}>
              Orders
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/coupon" className={activeLink}>
              Coupon
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/category" className={activeLink}>
              Categories
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/brand" className={activeLink}>
              Brands
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminNavbar;
