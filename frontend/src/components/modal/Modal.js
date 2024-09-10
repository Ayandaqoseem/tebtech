import ReviewService from "../../pages/review/reviewService/ReviewService";
import "./blogPostModel.scss";

export default function Modal({
  setShowDelete,
  proceed,
  message,
  isReview,
  setIsReview,
}) {
  const handleCancel = () => {
    setShowDelete(false);
    if(isReview) {
      setIsReview(false); 
    }
  };
  return (
    <section className="blog-modal-container">
      <div className={"--flex-center modal"}>
        <div className="--bg-light --p --card modal-content">
          {/* <h3>Redirect to Payment Page</h3> */}
          <h3>{message}</h3>
          {isReview && (
            <div>
              <ReviewService />
            </div>
          )}
          <div className="blog-post-btn-container">
            <button
              className="--btn --btn-lg blog-post-btn-del"
              onClick={proceed}
            >
              {isReview ? "" : "Proceed"}
            </button>
            <button
              className="--btn --btn-lg blog-post-btn-can"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
