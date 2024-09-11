import { CiFacebook, CiLinkedin, CiTwitter } from "react-icons/ci";
import styles from "./HomeFooter.module.scss";
import { Link } from "react-router-dom"
import { PiInstagramLogoThin } from "react-icons/pi";

export default function HomeFooter() {
  return (
    <div className={styles["footer-gen-conatiner"]}>
      <div className={styles["footer-content-container"]}>
        <div className={styles["footer-content-wrapper"]}>
          <div className={styles["footer-content-link"]}>
            <Link>Payment & Delivery Information</Link>
            <Link>Return Policy</Link>
            <Link>Terms and Conditions</Link>
          </div>

          <div className={styles["footer-contact"]}>
            <h3 className={styles["footer-content-h3"]}>Visit Us</h3>
            <p className={`${styles["parag"]} `}>
             Tebtechnologyltd, <br />
             9, Thomas Adeboye street Olowo-ira, <br />
            Ojodu Berger, Lagos
            </p>


            <h3 className={styles["footer-content-h3"]}>Contact</h3>
            <p className={`${styles["parag"]} `}>
            +2347061818588
            </p>

            <h3 className={styles["footer-content-h3"]}>Other Inquiries</h3>
            <p className={`${styles["parag"]} `}>
            tebtechnologyltd@gmail.com
            </p>
          </div>

          <div className={styles["footer-content-subscribe"]}>
            <h3 className={styles["footer-content-h3"]}>Subscribe</h3>
            <p className={styles["footer-content-input"]}>
             <input 
             type="text"
              placeholder="Enter your email here*"
             />
             <button type="subtmit" className={styles["footer-content-btn"]}>Join</button>
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
