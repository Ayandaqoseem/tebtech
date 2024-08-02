import { useEffect, useState } from "react";
import styles from "./UpdateBlog.module.scss";
// import { Card } from "../../../card/Card";

import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {  getSingleBlog, updateBlog } from "../../../../redux/feactures/blog/blogSlice";
import Blogform from "../../../blogForm/BlogForm";
import { useNavigate, useParams } from "react-router-dom";



// const cloud_name = process.env.REACT_APP_CLOUD_NAME;
const upload_preset = process.env.REACT_APP_UPLOAD_PRESET;
const url = process.env.REACT_APP_CLOUD_URL;
const vd_url = process.env.REACT_APP_CLOUD_URL_VIDEO;
const upload_vd_preset = process.env.REACT_APP_UPLOAD_PRESET_VIDEO;
export default function UpdateBlog() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams()
    
    const { blog } = useSelector((state) => state.blog)
  const [blogData, setBlogData] = useState();
  const [blogImage, setBlogImage] = useState(null);
  const [blogVideo, setBlogVideo] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [textDescription, setTextDescription] = useState("");
//   const { title, video, photo, publish, views, likes } = blogData;


  // console.log("blog image", blogImage);
  // console.log("blog image", blogVideo);
 

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
    setBlogData({ ...blogData, [name]: value });
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
        setBlogData((prevData) => ({
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
        setBlogData((prevData) => ({
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
      title: blogData.title,
      video: blogData.video,
      photo: blogData.photo,
      likes: blogData.likes,
      views: blogData.views,
      publish: blogData.publish,
      textDescription,
    };
    console.log("FORM DATA HERE", formData);
    console.log("FORM DATA ID", id);
    try {
      await dispatch(updateBlog({ id, formData }));
      toast.success("Blog update successfully");
      navigate("/admin/dashboard/get-blogs");
      
    } catch (error) {
      console.error("Error uploading photo:", error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    dispatch(getSingleBlog(id))
  }, [dispatch, id])


  useEffect(() => {
setBlogData(blog);

if (blog && blog.photo) {
    setBlogImage(blog.photo);
    setImagePreview(blog.photo);
}
if (blog && blog.video) {
    setBlogVideo(blog.video);
    setVideoPreview(blog.video);
}

setTextDescription(
    blog && blog.textDescription ? blog.textDescription : ""
);
  }, [blog])

  return (
    <div className={styles["create-blog-container"]}>
     <Blogform
        blogData={blogData}
        blogImage={blogImage}
        setBlogImage={setBlogImage}
        blogVideo={blogVideo}
        setBlogVideo={setBlogVideo}
        imagePreview={imagePreview}
        setImagePreview={setImagePreview}
        textDescription={textDescription}
        setTextDescription={setTextDescription}
        videoPreview={videoPreview}
        handleImageChange={handleImageChange}
        handleVideoChange={handleVideoChange}
        handleblogChange={handleblogChange}
        uploadNow={uploadNow}
        uploadVidNow={uploadVidNow}
        handleSubmit={handleSubmit}
        submitButtonName="Update Blog"
     />
    </div>
  );
}

