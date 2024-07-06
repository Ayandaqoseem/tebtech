import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import styles from "./Services.module.scss";
import AboutFooter from "../about/AboutFooter";
import { Link } from "react-router-dom";

export default function Services() {
  return (
    <>
      <section>
        <div className={styles.container}>
          <div className={styles["service-wrapper"]}>
            <h3 className="--center-text-r">Our Services</h3>
            <div className={styles["service-list-main-wrapper"]}>
              <div className={styles["service-sub-wrapper"]}>
                <p className="--pr-2">
                  At Tebtechnology we take the responsibility of working on your
                  most valuable asset and also your personal safety, very
                  serious. That’s why we have the best professionals, whose
                  commitment is to give you the highest standard of excellence.
                </p>
                <div className={styles["service-list-wrapper"]}>
                  <div className={styles["service-list"]}>
                    <h5>Solar/Inverter Installation</h5>
                    <p>
                      Tebtechnology Company, is not only the best inverter
                      installation company, but we also offer an unrivaled
                      service to our happy customers.
                    </p>
                    <Link to={"/service/solar-details"}>
                      <button type="button">Learn More</button>
                    </Link>
                  </div>

                  <div className={styles["service-list"]}>
                    <h5>CCTV Installation</h5>
                    <p>
                      Our Company is a leading security system company that
                      offers end to end security cameras systems and services.
                    </p>
                    <Link to={"/service/cctv-details"}>
                      <button type="button">Learn More</button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className={styles["eng-img"]}>
                <img
                  src="https://i.ibb.co/GJ6WZQs/teb-eng-img.webp"
                  alt="Eng"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className={styles["about-contact-wrapper"]}>
          <AboutFooter />
        </div>
      </section>
      <div className="social-icons">
          <p>Share</p>
        <span>
          <FacebookShareButton
            url="http://localhost:3000/about"
            subject="Welcome to Tebtechnology, your premier destination for top-notch electrical solutions. We specialize in the installation of cutting-edge inverters and CCTV cameras, offering unparalleled service for both residential and commercial needs."
            hashtag="#about"
          >
            <FacebookIcon
              size={30}
              bgStyle={{ fill: "transparent" }}
              iconFillColor="#316ff6"
              round={true}
              borderRadius={25}
            />
          </FacebookShareButton>

          <TwitterShareButton
            url="http://localhost:3000/about"
            subject="Welcome to Tebtechnology, your premier destination for top-notch electrical solutions. We specialize in the installation of cutting-edge inverters and CCTV cameras, offering unparalleled service for both residential and commercial needs."
            hashtag="#about"
          >
            <TwitterIcon
              size={30}
              bgStyle={{ fill: "transparent" }}
              iconFillColor="#1da1f2"
              round={true}
              borderRadius={25}
            />
          </TwitterShareButton>

          <WhatsappShareButton
            url="http://localhost:3000/about"
            subject="Welcome to Tebtechnology, your premier destination for top-notch electrical solutions. We specialize in the installation of cutting-edge inverters and CCTV cameras, offering unparalleled service for both residential and commercial needs."
            hashtag="#about"
          >
            <WhatsappIcon
              size={30}
              bgStyle={{ fill: "transparent" }}
              iconFillColor="#25d366"
              round={true}
              borderRadius={25}
            />
          </WhatsappShareButton>

          <LinkedinShareButton
            url="http://localhost:3000/about"
            subject="Welcome to Tebtechnology, your premier destination for top-notch electrical solutions. We specialize in the installation of cutting-edge inverters and CCTV cameras, offering unparalleled service for both residential and commercial needs."
            hashtag="#about"
          >
            <LinkedinIcon
              size={30}
              bgStyle={{ fill: "transparent" }}
              iconFillColor="#c71610"
              round={true}
              borderRadius={25}
            />
          </LinkedinShareButton>
        </span>
      </div>
    </>
  );
}
