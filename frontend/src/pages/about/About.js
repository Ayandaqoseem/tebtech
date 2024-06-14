import { VscArrowCircleRight } from "react-icons/vsc";
import styles from "./About.module.scss";
import EngImg from "../../assets/01.jpg";
import { AboutService } from "../../components/data";
import AboutFooter from "./AboutFooter";
import { SocialIcon } from "../../components/utils";


export default function About() {
  return (
    <>
      <section>
        <div className={styles.container}>
          <div className={styles["about-header-img"]}>
            <div className={`shape ${styles["shape-1"]}`}></div>
            <div className={`shape ${styles["shape-2"]}`}></div>
            <div className={`shape ${styles["shape-3"]}`}></div>
            <div className={`shape ${styles["shape-3"]}`}></div>
            <div className={`shape ${styles["shape-4"]}`}></div>
          </div>
          <div className={styles["about-teb-details"]}>
            <h3>Get To Know Us</h3>
            <div className={styles["about-p-img-container"]}>
              <div className={styles["about-p-container"]}>
                <p>
                  Welcome to Tebtechnology, your premier destination for
                  top-notch electrical solutions. We specialize in the
                  installation of cutting-edge inverters and CCTV cameras,
                  offering unparalleled service for both residential and
                  commercial needs.
                </p>

                <p>
                  Despite being a new company, our team brings a wealth of
                  expertise to every project. With a combined experience of over
                  two decades in the solar and cctv installation, we assure you
                  of reliable and professional service that exceeds your
                  expectations.
                </p>

                <p>
                  At Tebtechnology, customer satisfaction is our top priority.
                  We believe in the power of attentive listening to truly
                  understand your needs and preferences. While we always strive
                  to accommodate your requests, our experienced team may also
                  provide expert advice when necessary, prioritizing safety and
                  efficiency.
                </p>

                <p>
                  Our courteous staff is dedicated to delivering excellence in
                  every aspect of our service, from installation to maintenance
                  and repairs. With Tebtechnology, you can trust in our
                  commitment to quality and precision.
                </p>
                <p>Discover the difference with Tebtechnology:</p>
                <div className={styles["discover-container"]}>
                  <p>
                    <VscArrowCircleRight size={18} color="orangered" />
                    <span>Courteous Staff</span>
                  </p>
                  <p>
                    <VscArrowCircleRight size={18} color="orangered" />
                    <span>Attentive Builders</span>
                  </p>
                  <p>
                    <VscArrowCircleRight size={18} color="orangered" />
                    <span>Innovative Solutions</span>
                  </p>
                  <p>
                    <VscArrowCircleRight size={18} color="orangered" />
                    <span>Precise Engineering</span>
                  </p>
                </div>
              </div>
              <div className={styles["img-wrapper"]}>
                <img className={styles.img} src={EngImg} alt="eng" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={styles["offer-section"]}>
        <div className={styles["offer-container"]}>
          <h3 className={styles["my-1"]}>What We Offer</h3>
          <p className={styles["my-1"]}>
            Our Domestic and Industrial services include but are not limited to
            the following:
          </p>

          <div className={styles["about-service-container"]}>
            {AboutService.map((s) => {
              const { _id, image, headerLine, info } = s;
              return (
                <div className={styles["about-service-wrapper"]} key={_id}>
                  <img src={image} alt="solar-box" />

                  <h4>{headerLine}</h4>
                  <p>{info}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section>
        <div className={styles["about-contact-wrapper"]}>
          <AboutFooter />
        </div>
      </section>
      <SocialIcon />
    </>
  );
}
