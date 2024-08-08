import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styles from "./BlogForm.module.scss";
import { Card } from "../card/Card";
import { useSelector } from "react-redux";
import { Spinner } from "../loader/Loader";

export default function BlogForm({
  blogData,
  blogImage,
  setBlogImage,
  blogVideo,
  setBlogVideo,
  imagePreview,
  setImagePreview,
  textDescription,
  setTextDescription,
  videoPreview,
  handleImageChange,
  handleVideoChange,
  handleblogChange,
  uploadNow,
  uploadVidNow,
  handleSubmit,
  submitButtonName
}) {

  const { isLoading } = useSelector((state) => state.blog)

  console.log("Show loading status", isLoading);
  return (
    <Card cardClass={styles["card-container"]}>
      <div className={styles["form-wrapper"]}>
        <h3>Create Blog</h3>
        <div className={styles["file-wrapper"]}>
          {imagePreview || videoPreview ? (
            <div className={styles["img-video-wrapper"]}>
              {imagePreview && (
                <div className={styles["img-preview"]}>
                  <img src={imagePreview} alt="blog" />
                  <button
                    className={`--btn --btn-secondary ${styles["blog-upload-button"]}`}
                    onClick={uploadNow}
                  >
                    {isLoading ? <Spinner /> : "Upload Image"}
                  </button>
                </div>
              )}
              {videoPreview && (
                <div className={styles["video-preview"]}>
                  <video
                    controls
                    controlsList="nodownload"
                    autoPlay
                    loop
                    src={videoPreview}
                  ></video>
                  <button
                    className={`--btn --btn-secondary ${styles["video-upload-button"]}`}
                    onClick={uploadVidNow}
                  >
                    {isLoading ? <Spinner /> : "Upload Video"}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <p>No media selected</p>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <p className={styles["create-blog-p-file"]}>
            <label>
              Select Photo
              <input
                type="file"
                accept="image/*"
                className={styles["create-blog-input-file"]}
                name="photo"
                onChange={handleImageChange}
              />
            </label>
            <label>
              Select Video
              <input
                type="file"
                accept="video/*"
                className={styles["create-blog-input-file"]}
                name="video"
                onChange={handleVideoChange}
              />
            </label>
          </p>

          <input
            type="text"
            placeholder="Title"
            className={styles["create-blog-input"]}
            name="title"
            value={blogData?.title}
            onChange={handleblogChange}
          />

          <ReactQuill
            theme="snow"
            value={textDescription}
            onChange={setTextDescription}
            modules={BlogForm.modules}
            formats={BlogForm.formats}
            className={styles["quill-editor"]}
          />

          <button type="submit" className={styles["create-blog-btn"]}>
            {submitButtonName}
          </button>
        </form>
      </div>
    </Card>
  );
}

BlogForm.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
};

BlogForm.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "video",
  "image",
  "code-block",
  "align",
];
