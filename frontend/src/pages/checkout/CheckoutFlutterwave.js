import React, { useEffect, useState, useRef } from "react";
import styles from "../../components/checkout/checkoutForm/CheckoutForm.module.scss";
import { Card } from "../../components/card/Card";
import CheckoutSummary from "../../components/checkout/checkoutSummary/CheckoutSummary";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Confetti from "react-confetti";
import Modal from "../../components/modal/Modal";
import { createOrder } from "../../redux/feactures/product/orderSlice";
// import { getCoupon } from "../../redux/feactures/coupon/couponSlice";
import {
  CALCULATE_SUBTOTAL,
  selectCartItems,
  selectCartTotalAmount,
} from "../../redux/feactures/product/cartSlice";
import {
  // selectBillingAddress,
  selectPaymentMethod,
  selectShippingAddress,
} from "../../redux/feactures/product/checkoutSlice";
import { selectUser } from "../../redux/feactures/auth/authSlice";
import { BACKEND_URL, extractIdAndCartQuantity } from "../../utils";

const CheckoutFlutterwave = () => {
  const [showDelete, setShowDelete] = useState(false);
  const [modalLink, setModalLink] = useState("");
  const isSaveOrder = useRef(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const shippingAddress = useSelector(selectShippingAddress);
  const paymentMethod = useSelector(selectPaymentMethod);
  const { coupon } = useSelector((state) => state.coupon);

  const [urlParams] = useSearchParams();
  const payment = urlParams.get("payment");
  const ref = urlParams.get("ref");

  const message="You are being redirected to a payment page. Do you want to proceed?"

  // Refs to store stable values
  const cartTotalAmountRef = useRef(cartTotalAmount);
  const couponRef = useRef(coupon);

  

  // Update refs on changes
  useEffect(() => {
    cartTotalAmountRef.current = cartTotalAmount;
  }, [cartTotalAmount]);

  useEffect(() => {
    couponRef.current = coupon;
  }, [coupon]);

  // Update cart total when items change
  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL({ coupon: couponRef.current }));
  }, [cartItems, dispatch]);

  const saveOrder = async () => {
    const today = new Date();

    // Retrieve from local storage
    const storedCartTotalAmount = JSON.parse(
      localStorage.getItem("cartTotalAmount")
    );
    const storedCoupon = JSON.parse(localStorage.getItem("coupon"));

    const formData = {
      orderDate: today.toDateString(),
      orderTime: today.toLocaleTimeString(),
      orderAmount: storedCartTotalAmount, 
      orderStatus: "Order Placed...",
      cartItems,
      shippingAddress,
      paymentMethod,
      coupon:
        storedCoupon && storedCoupon.name ? storedCoupon : { name: "nil" },
    };
    
    dispatch(createOrder(formData));
    isSaveOrder.current = true;

    localStorage.removeItem("cartTotalAmount");
    localStorage.removeItem("coupon");
  };

  useEffect(() => {
    if (payment === "successful" && ref && !isSaveOrder.current) {
      toast.success("Payment successful");
      saveOrder();
    } else if (payment === "failed") {
      toast.error("Payment Failed, please try again later");
    }

    if (payment === "successful") {
      const navigateTimeout = setTimeout(() => {
        navigate("/checkout-success");
      }, 0);
      return () => clearTimeout(navigateTimeout);
    }
  }, [payment, navigate, ref]);

  const payWithFlutterwave = async () => {
    localStorage.setItem(
      "cartTotalAmount",
      JSON.stringify(cartTotalAmountRef.current)
    );
    localStorage.setItem("coupon", JSON.stringify(couponRef.current));
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/order/payWithFlutterwave`,
        {
          cartItems: extractIdAndCartQuantity(cartItems),
          userID: user._id,
          coupon: couponRef.current, 
        }
      );

      if (response.data.paymentLink) {
        setModalLink(response.data.paymentLink);
        setShowDelete(true);
      } else {
        console.error("Invalid payment link response", response.data);
        toast.error("Unable to initiate payment. Please try again.");
      }
    } catch (error) {
      console.error("Payment initiation error:", error);
      toast.error(
        "An error occurred while initiating payment. Please try again."
      );
    }
  };

  return (
    <>
      {payment === "successful" && <Confetti />}
      <section>
        <div
          className={`${styles["flutterwave-container"]} ${styles.checkout}`}
        >
          <h2>Checkout</h2>
          <form>
            <div>
              <Card cardClass={styles.card}>
                <CheckoutSummary />
              </Card>
            </div>
            <div>
              <Card cardClass={`${styles.card} ${styles.pay}`}>
                <h3>Flutterwave Checkout</h3>
                <button
                  type="button"
                  className={styles.button}
                  onClick={payWithFlutterwave}
                >
                  Pay Now
                </button>
              </Card>
            </div>
          </form>
        </div>
        {showDelete && (
          <Modal
            setShowDelete={setShowDelete}
            message={message}
            proceed={() => (window.location.href = modalLink)}
          />
        )}
      </section>
    </>
  );
};

export default CheckoutFlutterwave;
