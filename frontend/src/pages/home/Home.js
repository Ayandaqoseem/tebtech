import styles from "./Home.module.scss";
import { GiSolarPower } from "react-icons/gi";
import { TbSolarPanel2 } from "react-icons/tb";
import { GiCctvCamera } from "react-icons/gi";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import HomeFooter from "../../components/footer/Homefooter";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/feactures/product/productSlice";
import { useEffect } from "react";
import CarouselItem from "../../components/carousel/CarouselItem";
import LatestProductList from "../../components/product/productList/LatestProductList";
import ProductCarousel from "../../components/carousel/Carousel";
import { allReviews } from "../../redux/feactures/auth/authSlice";

export default function Home() {
  const { reviews } = useSelector((state) => state.auth);

 

  const PageHeading = ({ heading, btnText }) => {
    return (
      <>
        <div className="--flex-between">
          <h2 className="--fw-thin">{heading}</h2>
          <button className="--btn"> {btnText}</button>
        </div>
        <div className="--hr" />
      </>
    );
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
    dispatch(allReviews());
  }, [dispatch]);

  const { products } = useSelector((state) => state.product);
  const latest = Array.isArray(products)
    ? products.filter((item) => item.quantity > 0).slice(0, 20)
    : [];

  const userReviews = Array.isArray(reviews)
    ? reviews.map((review) => {
        return (
          <div key={review.id}>
            <CarouselItem
              name={review.name}
              photo={review.photo}
              reviewDate={review.reviewDate}
              review={review.review}
              star={review.star}
            />
          </div>
        );
      })
    : [];

  // console.log("LATEST SERVICE", reviews);

  const heroTextVariants = {
    initial: {
      x: -500,
      opacity: 0,
    },
    animate: {
      x: [500, 0],
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.1,
      },
    },
  };
  // const textVariants = {
  //   initial: {
  //     x: 50,
  //     opacity: 1,
  //   },
  //   animate: {
  //     x: [0, -90],
  //     opacity: 0,
  //     transition: {
  //       repeat: Infinity,
  //       repeatType: "loop",
  //       duration: 5,
  //       ease: "linear",
  //     },
  //   },
  // };

  return (
    <div className={styles["general-container"]}>
      <section>
        <div className={styles.mainContainer}>
          {/* <img src={ Hero } alt="hero" /> */}
          <div className={styles.HeroTextContainer}>
            <motion.div
              variants={heroTextVariants}
              className={styles.textWrapper}
              initial="initial"
              animate="animate"
            >
              <GiSolarPower
                variants={heroTextVariants}
                color="#ffa047"
                size={100}
              />
              <motion.h1 variants={heroTextVariants}>
                Broad Vision. Honest Service. Great Value.
              </motion.h1>
              <motion.p variants={heroTextVariants}>
                <motion.span variants={heroTextVariants}>
                  Our Goal Then and Now Is To Provide Qaulity Engineering.
                </motion.span>
              </motion.p>
              <motion.div
                variants={heroTextVariants}
                className={styles.btnContainer}
              >
                <Link to={"/send-a-request"}>
                  <motion.button
                    variants={heroTextVariants}
                    type="button"
                    className={styles.getQuote}
                  >
                    Get Free Quote
                  </motion.button>
                </Link>
                <Link to={"/shop"}>
                  <motion.button
                    variants={heroTextVariants}
                    type="button"
                    className={styles.getInTouch}
                  >
                    Shop Now
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
          <div className={styles.infoBox}>
            <p className={styles["text-1"]}>
              Welcome to tebtechnolgy. We efficiently deliver perfect service to
              our clients. Patronize us today.
            </p>
          </div>
        </div>
      </section>
      <section>
        <div className={styles["about-teb-container"]}>
          <div className={styles["about-teb-text"]}>
            <h1>
              Meet The Emerging Experts in Quality and Reliable Engineering
              Services in Nigeria.
            </h1>
            <p>
              <span>
                Bringing Your Dreams to Life and Ensuring Their Security
              </span>
            </p>
            <p className={`--parag ${styles["about-teb-p"]}`}>
              Welcome to Tebtechnology, your premier hub for cutting-edge
              engineering solutions. Specializing in safe solar inverter and
              cctv camera services, we cater to the diverse needs of residential
              and industrial clients, offering expert installation, maintenance,
              and restoration.
            </p>
            <p className={`--parag ${styles["about-teb-p"]}`}>
              Despite our youth in the industry, our commitment to excellence
              and innovation sets us apart. Trust in Tebtechnology's dedication
              to delivering unparalleled reliability and quality in every
              project.
            </p>
          </div>
          <img src="https://i.ibb.co/GJ6WZQs/teb-eng-img.webp" alt="engineer" />
        </div>
      </section>

      <section>
        <div className={styles["service-container"]}>
          <h1 className={styles["service-text-header"]}>Our Specialization</h1>
          <p className={styles["service-text-para"]}>
            Our Domestic and Industrial services include but are not limited to
            the following:
          </p>
          <div className={styles["service-text-wrapper"]}>
            <div className={styles["service-text-holder"]}>
              <div className={styles["service-text-solar-header"]}>
                <TbSolarPanel2 size={25} />
                <h2>
                  <span>SOLAR/INVERTER</span>
                </h2>
              </div>

              <p className="--parag">
                Tebtechnology isn't just another inverter installation company
                in Lagos; we're committed to providing unparalleled service to
                our satisfied clientele.
              </p>
              <p className="--parag">
                From selecting the perfect inverter for your residence to
                handling the entire installation process, including inverter
                battery and solar setup, we've got you covered.
              </p>
            </div>

            <div className={styles["service-text-holder"]}>
              <div className={styles["service-text-camera-header"]}>
                <GiCctvCamera size={25} />
                <h2>
                  <span>CCTV/SECURITY CAMERAS</span>
                </h2>
              </div>
              <p className="--parag">
                Blazing a trail in CCTV installation services in Lagos,
                Tebtechnology is committed to delivering high-quality security
                solutions for your property.
              </p>
              <p className="--parag">
                Leveraging partnerships with globally recognized brands, our
                skilled installers deploy cutting-edge video surveillance
                systems.
              </p>
              <p className="--parag">
                Experience the convenience of remote monitoring, allowing you to
                keep an eye on your premises from any location using your
                smartphone, PC, or tablet.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className={styles.ProductListContainer}>
          <h4>Choose a product as per your need</h4>

          <div className={styles["home-latest-product"]}>
            <LatestProductList products={latest} />
          </div>
        </div>
      </section>
      <section>
        <div className={styles["review-wrapper"]}>
          <div className={styles["review-product-carousel"]}>
            <div className={styles["testimony-wrapper"]}>
              <div className={styles["testimony"]}>
                <p>Our Clients Testimony</p>
                <div className={styles.hr}></div>
              </div>
              <h2 className={styles.h3}>What People Say</h2>
            </div>
            <ProductCarousel products={userReviews} />
          </div>
        </div>
        <div className={styles["small-div-container"]}>
          <div className={styles["small-div-subContainer"]}>
            <img
              src="https://i.ibb.co/5BsCjRv/lap-eng-3-removebg-preview.png"
              alt="eng"
            />
            <div className={styles["small-div-text-Container"]}>
              <div className={styles["small-div-text"]}>
                <h3>Get Your Free Consultation</h3>
                <p>
                  <span>
                    A representative will review your request and should send
                    you a personal response within 24 hours.
                  </span>
                </p>
              </div>
              <Link to={"/send-a-request"}>
                <button className={styles.btn}>Send Request</button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <HomeFooter />
    </div>
  );
}
