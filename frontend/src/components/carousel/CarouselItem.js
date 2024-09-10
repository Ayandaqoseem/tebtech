import "./Carousel.scss";
import { ImQuotesRight } from "react-icons/im";
import { ImQuotesLeft } from "react-icons/im";
import StarRatings from "react-star-ratings";

const CarouselItem = ({ name, photo, reviewDate, review, star }) => {
  return (
    <div className="carouselItem">
      <div className="carouselItem-wrapper">
        <ImQuotesRight size={40} color="#0066ff" className="right" />
        <div>
          <div className="review-content-wrapper">
            <StarRatings
              starDimension="20px"
              starSpacing="2px"
              starRatedColor="#F6B01E"
              rating={star}
              editing={false}
            />
            <p className="review-text">{reviewDate}</p>
            <p className="review-text review-content">{review}</p>
          </div>
          <span>
            <img className="product--image" src={photo} alt="product" />
            <p className="review-text">{name}</p>
          </span>
        </div>
        <ImQuotesLeft size={40} color="#0066ff" className="left" />
      </div>
    </div>
  );
};

export default CarouselItem;
