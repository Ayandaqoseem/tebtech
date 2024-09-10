import { useDispatch, useSelector } from "react-redux";
import StarRatings from "react-star-ratings";
import styles from "../reviewProduct/ReviewProduct.module.scss";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { BsTrash } from "react-icons/bs";
import { Card } from "../../../components/card/Card";
import {
  deleteReviewService,
  getUser,
  reviewService,
  updateReviewService,
} from "../../../redux/feactures/auth/authSlice";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ReviewService() {
  const dispatch = useDispatch();
//   const navigate = useNavigate();
  const { isLoading, user } = useSelector((state) => state.auth);
  const [rate, setRate] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [review, setReview] = useState("");

  const changeStar = (newRating, name) => {
    setRate(newRating);
    console.table(newRating, name);
  };

  //   console.log("USER", user);
//   console.log("EDITING", isEditing);

  const delReview = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const id = user?._id;
    const formData = {
      userID: user?.serviceReview[0]?.userID,
    };
    dispatch(deleteReviewService({ id, formData })).then(() => {
      dispatch(getUser(user._id));

    });
  };

  

  const submitReview = (e) => {
    e.preventDefault();
    const id = user?._id;

    const today = new Date();
    const date = today.toDateString();

    if (rate === 0 || review === "") {
      return toast.error("Please enter rating and review");
    }
    const formData = {
      star: rate,
      review,
      reviewDate: date,
    };
    dispatch(reviewService({ id, formData })).then(() => {
      dispatch(getUser(user._id));

    });
  };


  const starEdit = async () => {
    setIsEditing(true);
    setRate(user?.serviceReview[0]?.star);
    setReview(user?.serviceReview[0]?.review);
  };
  const editReview = (e) => {
    e.preventDefault();

    const today = new Date();
    const date = today.toDateString();
    if (rate === 0 || review === "") {
      return toast.error("Please enter rating and review");
    }
    const id = user?._id;

    const formData = {
      star: rate,
      review,
      reviewDate: date,
      userID: id,
    };
    dispatch(updateReviewService({ id, formData })).then(() => {
      dispatch(getUser(user._id));
      setIsEditing(false);
    });
  };

  return (
    <section>
      <div className="">
        <h2>Review Service</h2>
        {user?.serviceReview?.length > 0 && !isEditing ? (
          <div className={styles["service-review-container"]}>
            <div>
              <img
                src={user?.serviceReview[0]?.photo}
                alt={user?.serviceReview[0]?.name}
                className={styles["service-review-img"]}
              />
              <p className={styles["service-review-parag"]}>
                {user?.serviceReview[0]?.name}
              </p>
            </div>
            <div>
              <StarRatings
                starDimension="20px"
                starSpacing="2px"
                starRatedColor="#F6B01E"
                rating={user?.serviceReview[0]?.star}
                changeRating={changeStar}
                editing={false}
              />
              <p className={styles["service-review-parag"]}>
                {user?.serviceReview[0]?.review}
              </p>
              <span>
                <b>{user?.serviceReview[0]?.reviewDate}</b>
              </span>

              <div className={styles["service-review-icon"]}>
                <FaEdit color="green" size={25} onClick={() => starEdit()} />
                <BsTrash color="red" size={25} onClick={delReview} />
              </div>
            </div>
          </div>
        ) : (
          <Card cardClass={"card --width-500px --p"}>
            <form>
              <label>Rating:</label>
              <StarRatings
                starDimension="20px"
                starSpacing="2px"
                starRatedColor="#F6B01E"
                starHoverColor="#F6B01E"
                rating={rate}
                changeRating={changeStar}
                editing={true}
                isSelectable={true}
              />
              <label>Review</label>
              <textarea
                value={review}
                required
                onChange={(e) => setReview(e.target.value)}
                cols="30"
                rows="10"
                maxLength="200"
              ></textarea>
              {!isEditing ? (
                <button
                  onClick={(e) => submitReview(e)}
                  className="--btn --btn-primary"
                  disabled={isLoading}
                >
                  Submit Review
                </button>
              ) : (
                <div className="--flex-start">
                  <button
                    onClick={(e) => editReview(e)}
                    className="--btn --btn-primary"
                  >
                    Update Review
                  </button>
                  <button onClick={() => setIsEditing(false)} className="--btn">
                    Cancel
                  </button>
                </div>
              )}
            </form>
          </Card>
        )}
      </div>
    </section>
  );
}
