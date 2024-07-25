// import { GiSolarPower } from "react-icons/gi";
import { motion } from "framer-motion";
import styles from "./Contact.module.scss";
import { SocialIcon } from "../../components/utils";
import { Card } from "../../components/card/Card";
import { PiPhoneCall } from "react-icons/pi";
import { RiHomeOfficeLine } from "react-icons/ri";
import { IoMailOutline } from "react-icons/io5";
import { LiaBusinessTimeSolid } from "react-icons/lia";
import { CiFacebook, CiTwitter, CiLinkedin } from "react-icons/ci";
import { PiInstagramLogoThin } from "react-icons/pi";
import EnquiryForm from "../../components/form/EnquiryForm";
import { useState } from "react";
import Map from "../../components/card/Map";
import { useDispatch } from "react-redux";
import { saveEnquiry } from "../../redux/feactures/auth/authSlice";
import { toast } from "react-toastify";

const initialstate = {
  name: "",
  email: "",
  enquiry: "",
  subject: "",
  message: "",
};
export default function Contact() {
  const [request, setRequest] = useState(initialstate);
  const { name, email, enquiry, subject, message } = request
  const mapAddress = process.env.REACT_APP_GOOGLE_MAP_ADDRESS;

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRequest({ ...request, [name]: value });
  };

  const saveRequest = async (e) => {
    e.preventDefault();
    // const { name, email, enquiry, subject, message } = request;
    if (!name || !email || !enquiry || !subject || !message) {
      return toast.warning("All fields are required.");
    }
    const userData = {
      name,
      email,
      enquiry,
      subject,
      message
    }

    await dispatch(saveEnquiry(userData))
    toast.success("Enquiry saved and email sent")
    setRequest(initialstate)
  };

  // const heroTextVariants = {
  //   initial: {
  //     x: -500,
  //     opacity: 0,
  //   },
  //   animate: {
  //     x: [500, 0],
  //     opacity: 1,
  //     transition: {
  //       duration: 1,
  //       staggerChildren: 0.1,
  //     },
  //   },
  // };

  const socialTextVariants = {
    initial: {
      y: 100,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.2,
        y: {
          type: "spring",
          stiffness: 60,
        },
        opacity: { duration: 0.1 },
        ease: "easeIn",
        duration: 1,
      },
    },
  };

  const iframeMapStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    border: 0,
  };

  return (
    <div className={styles.container}>
      <section>
        {/* <HeroBanner
          motion={motion}
          initial={"initial"}
          animate={"animate"}
          heroTextVariants={heroTextVariants}
          GiSolarPower={GiSolarPower}
        /> */}
      </section>
      <section>
        <div className={styles["contact-container"]}>
          <h1>Contact Us</h1>
          <div className={styles["contact-wrapper"]}>
            <Card cardClass={styles.card}>
              <PiPhoneCall size={40} color="#ffa047" />
              <h4>Call</h4>
              <p>+2347061818588</p>
            </Card>

            <Card cardClass={styles.card}>
              <IoMailOutline size={40} color="#ffa047" />
              <h4>Mail</h4>
              <p>tebtechnologyltd@gmail.com</p>
            </Card>

            <Card cardClass={styles.card}>
              <RiHomeOfficeLine size={40} color="#ffa047" />
              <h4>Address</h4>
              <p>9 Thomas Adeboye Street Olowo-ira Ojodu-Berger, Lagos</p>
            </Card>

            <Card cardClass={styles.card}>
              <LiaBusinessTimeSolid size={40} color="#ffa047" />
              <h4>Working Hours</h4>
              <p>Mon-Fri: 10AM-5PM</p>
              <p>Sat-Sun: 10AM-1PM</p>
            </Card>
          </div>
        </div>
      </section>
      <section>
        <div className={styles["request-container"]}>
          <div className={styles["request-text-container"]}>
            <h1>Send Us A Message</h1>
            <p className={styles["text-0"]}>
              A Representative Will Review Your Request And Should Send You A
              Personal Response Within 24 Hours.
            </p>
            <hr />
            <p className={styles["text-1"]}>Call Us Now On </p>
            <p className={styles["text-2"]}>+2347061818588</p>
            <p className={styles["text-3"]}>We Provide 24/7 Assistance</p>
          </div>
          <div className={styles["enquiry-form-wrapper"]}>
            <EnquiryForm
              handleInputChange={handleInputChange}
              saveRequest={saveRequest}
              request={request}
            />
          </div>
        </div>
      </section>
      <section>
        <Map />
        <div className={styles["map-container"]}>
          <iframe
            src={mapAddress}
            // width="600"
            // height="450"
            style={iframeMapStyle}
            allowFullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            title="Google Map"
          ></iframe>
          <motion.div
            className={styles["social-container"]}
            variants={socialTextVariants}
            initial="initial"
            whileInView="animate"
          >
            <div className={styles["social-text-wrapper"]}>
              <h3>Find us on social media</h3>
              <p>
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
            </div>
          </motion.div>
        </div>
      </section>
      <SocialIcon />
    </div>
  );
}
