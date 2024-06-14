import {
  FacebookShareButton,
  FacebookIcon,
  TwitterIcon,
  TwitterShareButton,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "react-share";
import "./index.scss"

export default function HeroBanner({
  motion,
  initial,
  animate,
  heroTextVariants,
  GiSolarPower,
}) {
  return (
    <>
      <div className={"mainContainer"}>
        {/* <img src={ Hero } alt="hero" /> */}
        <div className={"HeroTextContainer"}>
          <motion.div
            variants={heroTextVariants}
            className={"textWrapper"}
            initial={initial}
            animate={animate}
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
              className={"btnContainer"}
            >
              <motion.button
                variants={heroTextVariants}
                type="button"
                className={"getQuote"}
              >
                Get Free Quote
              </motion.button>
              <motion.button
                variants={heroTextVariants}
                type="button"
                className={"getInTouch"}
              >
                Get In Touch
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
        {/* <div className={"infoBox"}>
          <p className={"text-1"}>
            Welcome to tebtechnolgy. We efficiently deliver perfect service to
            our clients. Patronize us today.
          </p>
        </div> */}
      </div>
    </>
  );
}

export const SocialIcon = () => {
  return (
    <>
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
  )
}

// Validate email
export const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};
