import { Link } from "react-router-dom";
import styles from "./About.module.scss";

export default function AboutFooter() {
  return (
    <section className={styles["about-contact-section"]}>
      <div className={styles["about-contact"]}>
        <h3>We Provide The Best Service In the Industry</h3>
        <p>
          A representative will review your request and should send you a
          personal response within 24 hours.
        </p>
        <Link to={"/contact"}>
          <button>Contact Us Today</button>
        </Link>
      </div>
    </section>
  );
}
