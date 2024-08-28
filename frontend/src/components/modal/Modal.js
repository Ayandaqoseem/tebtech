import "./blogPostModel.scss";

export default function Modal({ setShowDelete, proceed, message }) {
  return (
    <section className="blog-modal-container">
      <div className="--flex-center modal">
        <div className="--bg-light --p --card modal-content">
          <h3>Redirect to Payment Page</h3>
          <p>{message}</p>
          <div className="blog-post-btn-container">
            <button
              className="--btn --btn-lg blog-post-btn-del"
              onClick={proceed}
            >
             Proceed
            </button>
            <button
              className="--btn --btn-lg blog-post-btn-can"
              onClick={() => setShowDelete(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
