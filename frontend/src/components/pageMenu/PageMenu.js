import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./PageMenu.scss";
import Modal from "../modal/Modal";

const PageMenu = () => {
  const [isShow, setIsShow] = useState(false);
  const [isReview, setIsReview] = useState(false);
  const message = "Kindly rate our service.";

 
  

  const handleClick = () => {
    setIsShow(!isShow);
    setIsReview(!isReview);
  };
  return (
    <>
      <span className="service-review-span">
        Click the "Leave a Review" button to provide feedback on the services we
        rendered for you.
      </span>
      <div className="menu-container">
        <nav className="--p --mb">
          <ul className="home-links">
            <li>
              <NavLink to="/order-history">Orders</NavLink>
            </li>

            <li>
              <NavLink to="/wishlist">Wishlist</NavLink>
            </li>

            <li>
              <button type="btn" className="review-btn" onClick={handleClick}>
                Leave Review
              </button>
            </li>
          </ul>
        </nav>
      </div>
      {isShow && (
        <Modal
          setShowDelete={setIsShow}
          message={message}
          isReview={isReview}
          setIsReview={setIsReview}
        />
      )}
    </>
  );
};

export default PageMenu;
