import { CiFacebook, CiLinkedin, CiTwitter } from "react-icons/ci";
import styles from "./HomeFooter.module.scss";
import { Link } from "react-router-dom";
import { PiInstagramLogoThin } from "react-icons/pi";
import { useState } from "react";
import { toast } from "react-toastify";
import { validateEmail } from "../utils";
import { useDispatch } from "react-redux";
import { newsletter } from "../../redux/feactures/auth/authSlice";

export default function HomeFooter() {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      return toast.warning("Please provide your email");
    }

    if (!validateEmail(email)) {
      return toast.warning("Please enter a valid email");
    }
    const formData = {
      email,
    };

    dispatch(newsletter(formData));
    setEmail("");
  };
  return (
    <div className={styles["footer-gen-conatiner"]}>
      <div className={styles["footer-content-container"]}>
        <div className={styles["footer-content-wrapper"]}>
          <div className={styles["footer-content-link"]}>
            <Link to={"/payment-policy"}>Payment & Delivery Information</Link>
            <Link to={"/return-policy"}>Return Policy</Link>
            <Link to={"/terms-policy"}>Terms and Conditions</Link>
          </div>

          <div className={styles["footer-contact"]}>
            <h3 className={styles["footer-content-h3"]}>Visit Us</h3>
            <p className={`${styles["parag"]} `}>
              Tebtechnologyltd, <br />
              9, Thomas Adeboye street Olowo-ira, <br />
              Ojodu Berger, Lagos
            </p>

            <h3 className={styles["footer-content-h3"]}>Contact</h3>
            <p className={`${styles["parag"]} `}>+2347061818588</p>

            <h3 className={styles["footer-content-h3"]}>Other Inquiries</h3>
            <p className={`${styles["parag"]} `}>tebtechnologyltd@gmail.com</p>
          </div>

          <div className={styles["footer-content-subscribe"]}>
            <h3 className={styles["footer-content-h3"]}>Subscribe</h3>
            <p className={styles["footer-content-input"]}>
              <input
                type="text"
                name="email"
                value={email}
                placeholder="Enter your email here*"
                onChange={handleChange}
              />
              <button
                type="subtmit"
                className={styles["footer-content-btn"]}
                onClick={handleSubmit}
              >
                Join
              </button>
            </p>

            <h3 className={styles["footer-content-survey"]}>Find Us</h3>
            <p className={styles["footer-content-icon"]}>
              <span>
                <CiFacebook className={styles.icon} />
              </span>
              <span>
                <PiInstagramLogoThin className={styles.icon} />
              </span>
              <span>
                <CiTwitter className={styles.icon} />
              </span>
              <span>
                <CiLinkedin className={styles.icon} />
              </span>
            </p>
            {/* <p>
            +2347061818588
            </p>

            <h3>Other Inquiries</h3>
            <p>
            tebtechnologyltd@gmail.com
            </p> */}
          </div>
        </div>
      </div>
      <div className={styles["home-footer"]}></div>
      <div className={styles["home-footer-1"]}></div>
    </div>
  );
}
