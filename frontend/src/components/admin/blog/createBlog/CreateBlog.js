import { useState } from "react";
import styles from "./CreateBlog.module.scss";
import { Card } from "../../../card/Card";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createBlog } from "../../../../redux/feactures/blog/blogSlice";
import { Spinner } from "../../../loader/Loader";

const initialState = {
  title: "",

  photo: "",
  video: "",
  publish: "",
  views: "",
  likes: "",
};

// const cloud_name = process.env.REACT_APP_CLOUD_NAME;
const upload_preset = process.env.REACT_APP_UPLOAD_PRESET;
const url = process.env.REACT_APP_CLOUD_URL;
const vd_url = process.env.REACT_APP_CLOUD_URL_VIDEO;
const upload_vd_preset = process.env.REACT_APP_UPLOAD_PRESET_VIDEO;
export default function CreateBlog() {
  const [formData, setFormData] = useState(initialState);
  const [blogImage, setBlogImage] = useState(null);
  const [blogVideo, setBlogVideo] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [textDescription, setTextDescription] = useState("");

  const { isLoading } = useSelector((state) => state.blog)

  const { title, video, photo, publish, views, likes } = formData;

  const dispatch = useDispatch();



  const handleImageChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      setBlogImage(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      toast.warning("No file selected or invalid file type.");
    }
  };

  const handleVideoChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      setBlogVideo(file);
      setVideoPreview(URL.createObjectURL(file));
    } else {
      toast.warning("No file selected or invalid file type.");
    }
  };

  const handleblogChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const uploadNow = async (e) => {
    e.preventDefault();

    let imageUrl;

    try {
      if (blogImage) {
        if (
          blogImage.type === "image/jpeg" ||
          blogImage.type === "image/png" ||
          blogImage.type === "image/jpg"
        ) {
          const image = new FormData();
          image.append("file", blogImage);
          image.append("upload_preset", upload_preset);
          image.append("folder", "tebtechnology_blog_img");

          const response = await fetch(url, {
            method: "POST",
            body: image,
          });

          if (!response.ok) {
            throw new Error("Image upload failed");
          }

          const imageData = await response.json();
          imageUrl = imageData.secure_url.toString();
        } else {
          toast.error("Invalid file type. Please upload an image.");
        }
        setFormData((prevData) => ({
          ...prevData,
          photo: imageUrl,
        }));

        toast.success("Image uploaded successfully!");
        setImagePreview(null);
      }
    } catch (error) {}
  };

  const uploadVidNow = async (e) => {
    e.preventDefault();
    let videoUrl;

    try {
      if (blogVideo) {
        if (["video/mp4", "video/webm"].includes(blogVideo.type)) {
          const video = new FormData();
          video.append("file", blogVideo);
          video.append("upload_preset", upload_vd_preset);
          video.append("folder", "tebtechnology_blog_video");

          const response = await fetch(vd_url, {
            method: "POST",
            body: video,
          });

          if (!response.ok) {
            throw new Error("Video upload failed");
          }

          const videoData = await response.json();
          videoUrl = videoData.secure_url.toString();
        } else {
          toast.error("Invalid file type. Please upload a video.");
        }
        setFormData((prevData) => ({
          ...prevData,
          video: videoUrl,
        }));

        toast.success("Video uploaded successfully!");
        setVideoPreview(null);
      }
    } catch (error) {
      console.error("Error uploading video:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      title,
      video,
      photo,
      likes,
      views,
      publish,
      textDescription,
    };
    console.log("FORM DATA HERE", formData);
    try {
      await dispatch(createBlog(formData));
      toast.success("Blog created successfully");
      setFormData(initialState);
      setTextDescription("");
    } catch (error) {
      console.error("Error uploading photo:", error);
      toast.error(error.message);
    }
  };

  return (
    <div className={styles["create-blog-container"]}>
      <Card cardClass={styles["card-container"]}>
        <div className={styles["form-wrapper"]}>
          <h3> Create Blog</h3>
          <div className={styles["file-wrapper"]}>
            {imagePreview || videoPreview ? (
              <div className={styles["img-video-wrapper"]}>
                {imagePreview && (
                  <div className={styles["img-preview"]}>
                    <img src={imagePreview} alt="blog" />
                    <button
                      className={`--btn --btn-secondary  ${styles["blog-upload-button"]}`}
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
                      className={`--btn --btn-secondary  ${styles["video-upload-button"]}`}
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
            {/* {imagePreview || videoPreview ? (
              <button
                className="--btn --btn-secondary upload-button"
                onClick={uploadNow}
              >
                {imagePreview ? "Upload Photo" : "Upload Video"}
              </button>
            ) : null} */}
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
              value={title}
              onChange={handleblogChange}
            />

            {/* <input
              type="text"
              placeholder="Message"
              className={styles["create-blog-input"]}
              name="textDescription"
              value={textDescription}
              onChange={handleblogChange}
            /> */}

            <ReactQuill
              theme="snow"
              value={textDescription}
              onChange={setTextDescription}
              modules={CreateBlog.modules}
              formats={CreateBlog.formats}
              className={styles["quill-editor"]}
            />

            <button type="submit" className={styles["create-blog-btn"]}>
              Create Blog
            </button>
          </form>
        </div>
      </Card>
    </div>
  );
}

CreateBlog.modules = {
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
CreateBlog.formats = [
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
