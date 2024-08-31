import React from "react";
import { NavLink } from "react-router-dom";
import "./PageMenu.scss";

const PageMenu = () => {
  return (
    <div className="menu-container">
      <nav className="--p --mb">
        <ul className="home-links">
          <li>
            <NavLink to="/order-history">Orders</NavLink>
          </li>
          {/* <li>
            <NavLink to="/wallet">My Wallet</NavLink>
          </li> */}
          <li>
            <NavLink to="/wishlist">Wishlist</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default PageMenu;
