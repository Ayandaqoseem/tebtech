import { BsTrash } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import StarRatings from "react-star-ratings";
import { Card } from "../../../components/card/Card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    deleteReview,
  getProduct,
  reviewProduct,
  updateReview,
} from "../../../redux/feactures/product/productSlice";
import { SpinnerGIF } from "../../../components/loader/Loader";
import { toast } from "react-toastify";
import styles from "./ReviewProduct.module.scss"

export default function ReviewProduct() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [rate, setRate] = useState(0);
  const [review, setReview] = useState("");
  const [userReview, setUserReview] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  const { product, isLoading } = useSelector((state) => state.product);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  const changeStar = (newRating, name) => {
    setRate(newRating);
    console.table(newRating, name);
  };

  const submitReview = async (e) => {
    e.preventDefault();

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
    dispatch(reviewProduct({ id, formData }));
    navigate(-1);
  };

  
  useEffect(() => {
    const reviewed = product?.ratings.filter((rev) => {
        return rev.userID === user?._id;
    });
    setUserReview(reviewed);
}, [product, user]);


const delReview = async () => {
    const formData = {
        userID: user?._id
    }
    dispatch(deleteReview({ id, formData }))
    navigate(-1)
}

const startEdit = async () => {
    setIsEditing(true)
    setRate(userReview[0].star)
    setReview(userReview[0].review)
}


const editReview = async (e) => {
  e.preventDefault();

  const today = new Date();
  const date = today.toDateString();
  if (rate === 0 || review === "") {
    return toast.error("Please enter rating and review");
  }
  const formData = {
    star: rate,
    review,
    reviewDate: date,
    userID: userReview[0].userID,
  };

  console.log("formData", formData);
  
  
  await dispatch(updateReview({ id, formData }));
  navigate(-1);
};


return (
    <section>
      <div className={`gen-container ${styles["review-container"]}`}>
        <h2>Review Product</h2>
        {isLoading && product === null ? (
          <SpinnerGIF />
        ) : (
          <>
            <p>
              <b>Product name:</b> {product?.name}
            </p>
            <img
              src={product?.image[0]}
              alt={product?.name}
              style={{ width: "100px" }}
            />
          </>
        )}
        {userReview?.length > 0 && !isEditing ? (
          <Card cardClass={styles["review-card"]}>
            <h3>Product Reviews</h3>
            {userReview.map((item, index) => {
              const { star, review, reviewDate, name } = item;
              return (
                <div key={index} className={`${styles.review} --flex-between`}>
                  <div >
                    <StarRatings
                      starDimension="20px"
                      starSpacing="2px"
                      starRatedColor="#F6B01E"
                      rating={star}
                      changeRating={changeStar}
                      editing={false}
                    />
                    <p>{review}</p>
                    <span>
                      <b>{reviewDate}</b>
                    </span>
                    <br />
                    <span>
                      <b>by: {name}</b>
                    </span>
                  </div>
                  <div className={styles["review-icon"]}>
                    <FaEdit
                      color="green"
                      size={25}
                      onClick={() => startEdit()}
                    />
                    <BsTrash color="red" size={25} onClick={delReview} />
                  </div>
                </div>
              );
            })}
          </Card>
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
              ></textarea>
              {!isEditing ? (
                <button
                  onClick={(e) => submitReview(e)}
                  className="--btn --btn-primary"
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
