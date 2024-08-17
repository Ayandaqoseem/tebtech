import { FaTimes } from "react-icons/fa";
import styles from "./Cart.module.scss";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_CART,
  CALCULATE_SUBTOTAL,
  CALCULATE_TOTAL_QUANTITY,
  CLEAR_CART,
  DECREASE_CART,
  REMOVE_FROM_CART,
  saveCartDB,
  selectCartItems,
  selectCartTotalAmount,
  selectCartTotalQuantity,
} from "../../redux/feactures/product/cartSlice";
import { FaTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import { selectIsLoggedIn } from "../../redux/feactures/auth/authSlice";
import { Card } from "../../components/card/Card";
import "./Radio.scss";
import { toast } from "react-toastify";
import {
  SAVE_PAYMENT_METHOD,
  selectPaymentMethod,
} from "../../redux/feactures/product/checkoutSlice";
import { getCartQuantityById } from "../../utils";
import NoShoppingCartImg from "../../assets/shopping-cart-img.svg";
// import VerifyCoupon from "../../components/verifyCoupon/VerifyCoupon";

export default function Cart({ setShowCart, showCart }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [paymentMethod, setPaymentMethod] = useState("");

  console.log(cartTotalAmount);

  const increaseCart = (cart) => {
    // const cartQuantity = getCartQuantityById(cartItems, cart._id);
    // if (cartQuantity === cart.quantity) {
    //   return toast.info("Max number of product reached!!!");
    // }
    dispatch(ADD_TO_CART(cart));
    dispatch(
      saveCartDB({ cartItems: JSON.parse(localStorage.getItem("cartItems")) })
    );
  };

  const decreaseCart = (cart) => {
    dispatch(DECREASE_CART(cart));
    dispatch(
      saveCartDB({ cartItems: JSON.parse(localStorage.getItem("cartItems")) })
    );
  };

  const removeFromCart = (cart) => {
    dispatch(REMOVE_FROM_CART(cart));
    dispatch(
      saveCartDB({ cartItems: JSON.parse(localStorage.getItem("cartItems")) })
    );
  };

  const clearCart = () => {
    dispatch(CLEAR_CART());
    dispatch(saveCartDB({ cartItems: [] }));
  };

  const { coupon } = useSelector((state) => state.coupon);
  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL({ coupon }));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  }, [cartItems, dispatch, coupon]);

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
    // dispatch(SAVE_PAYMENT_METHOD(paymentMethod));
  };

  const setPayment = (e) => {
    e.preventDefault();
    if (paymentMethod === "") {
      return toast.error("Please select a payment method");
    }
    dispatch(SAVE_PAYMENT_METHOD(paymentMethod));

    if (isLoggedIn) {
      navigate("/checkout-details");
    } else {
      navigate("/login?redirect=cart");
    }
  };
  return (
    <section className={styles["cart-modal-container"]}>
      <div className={styles["cart-wrapper"]}>
        <div className={`${styles["cart-container"]} ${styles.table}`}>
          <span className={styles["close-icon"]}>
            <FaTimes
              size={22}
              color="#000"
              onClick={() => setShowCart(!showCart)}
            />
          </span>
          <h2>Shopping Cart</h2>
          {cartItems?.length === 0 ? (
            <div className={styles["no-cart"]}>
              <p>Your cart is currently empty.</p>
              <span
                onClick={() => setShowCart(!showCart)}
                className={styles["cont-shop"]}
              >
                &larr; Continue shopping
              </span>
              <div>
                <img src={NoShoppingCartImg} alt="img-illustrator" />
              </div>
            </div>
          ) : (
            <>
              <table>
                <thead>
                  <tr>
                    <th>s/n</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems?.map((cart, index) => {
                    const { _id, name, price, image, cartQuantity } = cart;
                    return (
                      <tr key={_id}>
                        <td>{index + 1}</td>
                        <td>
                          <p>
                            <b>{name}</b>
                          </p>
                          <img
                            src={image[0]}
                            alt={name}
                            style={{ width: "100px" }}
                          />
                        </td>
                        <td>&#8358;{price}</td>
                        <td>
                          <div className={styles.count}>
                            <button
                              className="--btn"
                              onClick={() => decreaseCart(cart)}
                            >
                              -
                            </button>
                            <p>
                              <b>{cartQuantity}</b>
                            </p>
                            <button
                              className="--btn"
                              onClick={() => increaseCart(cart)}
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td>&#8358;{(price * cartQuantity).toFixed(2)}</td>
                        <td className={styles.icons}>
                          <FaTrashAlt
                            size={19}
                            color="red"
                            onClick={() => removeFromCart(cart)}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className={styles.summary}>
                <button className="--btn --btn-danger" onClick={clearCart}>
                  Clear Cart
                </button>
                <div className={styles.checkout}>
                  <div>
                    <span
                      onClick={() => setShowCart(!showCart)}
                      className={styles["cont-shop"]}
                    >
                      &larr; Continue shopping
                    </span>
                  </div>
                  <br />
                  <Card cardClass={styles.card}>
                    <p>
                      <b> {`Cart item(s): ${cartTotalQuantity}`}</b>
                    </p>
                    <div className={styles.text}>
                      <h4>Subtotal:</h4>
                      <h3>&#8358;{cartTotalAmount?.toFixed(2)}</h3>
                    </div>
                    {/* <VerifyCoupon /> */}
                    <div className="--underline --mb"></div>
                    <p>Please choose a payment method</p>
                    <form className="cart-form-control" onSubmit={setPayment}>
                      {/* <label htmlFor={"stripe"} className="radio-label">
                        <input
                          className="radio-input"
                          type="radio"
                          name={"paymentMethod"}
                          id={"stripe"}
                          value={"stripe"}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <span className="custom-radio" />
                        Stripe
                      </label> */}
                      <label htmlFor={"flutterwave"} className="radio-label">
                        <input
                          className="radio-input"
                          type="radio"
                          name={"paymentMethod"}
                          id={"flutterwave"}
                          value={"flutterwave"}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <span className="custom-radio" />
                        Flutterwave
                      </label>
                      {/* <label htmlFor={"paypal"} className="radio-label">
                        <input
                          className="radio-input"
                          type="radio"
                          name={"paymentMethod"}
                          id={"paypal"}
                          value={"paypal"}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <span className="custom-radio" />
                        Paypal
                      </label>
                      <label htmlFor={"wallet"} className="radio-label">
                        <input
                          className="radio-input"
                          type="radio"
                          name={"paymentMethod"}
                          id={"wallet"}
                          value={"wallet"}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <span className="custom-radio" />
                        Wallet
                      </label> */}
                      <label htmlFor={"wallet"} className="radio-label">
                        <input
                          className="radio-input"
                          type="radio"
                          name={"paymentMethod"}
                          id={"wallet"}
                          value={"wallet"}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <span className="custom-radio" />
                        Wallet
                      </label>
                      <button
                        type="submit"
                        className="--btn --btn-primary --btn-block checkout-btn"
                      >
                        Checkout
                      </button>
                    </form>
                    <p>Tax an shipping calculated at checkout</p>
                  </Card>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
