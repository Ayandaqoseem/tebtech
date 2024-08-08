import { useParams } from "react-router-dom";
import styles from "./SingleBlog.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getSingleBlog } from "../../redux/feactures/blog/blogSlice";
import { useEffect, useState } from "react";
import { Card } from "../../components/card/Card";
import { ImUser } from "react-icons/im";
import { RxCalendar } from "react-icons/rx";

// import decodeAndFormatHTML from "../../components/DecodeandFormatHTML";

function removeHTMLTagsAndEntities(input) {
  // Remove HTML tags
  const tagRegex = /<[^>]+>/g;
  let result = input.replace(tagRegex, "");

  // Decode HTML entities
  const entityMap = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&#39;": "'",
    "&nbsp;": " ",
  };

  result = result.replace(/&[^;]+;/g, (match) => entityMap[match] || match);

  return result;
}

function getEmbedUrl(videoUrl) {
  try {
    const url = new URL(videoUrl);
    if (url.hostname === "www.youtube.com" || url.hostname === "youtube.com") {
      return `https://www.youtube.com/embed/${url.searchParams.get("v")}`;
    }
  } catch (e) {
    console.error("Invalid video URL", e);
  }
  return null;
}

export default function SingleBlog() {
  const [singleBlog, setSingleBlog] = useState(null);
  const { blog } = useSelector((state) => state.blog);
  const { id } = useParams();
  const dispatch = useDispatch();
  console.log(singleBlog?.createdAt);

  // const { title, textDescription, photo, video } = singleBlog;
  const desc = singleBlog ? removeHTMLTagsAndEntities(singleBlog.textDescription) : "";
  const newVideo = getEmbedUrl(singleBlog?.video);

  useEffect(() => {
    dispatch(getSingleBlog(id));
  }, [dispatch, id]);

  useEffect(() => {
    setSingleBlog(blog);
  }, [blog]);
  return (
    <section className={styles["single-blog-section"]}>
      <div className={styles["single-blog-container"]}>
        <Card cardClass={styles["card-container"]}>
          <div className={styles["vid-img-wrapper"]}>
            <img src={singleBlog?.photo} alt="blogPhoto" />
            <video
              controls
              controlsList="nodownload"
              // autoPlay
              loop
              src={singleBlog?.video}
              // style={{ width: "100%" }}
            ></video>
          </div>
          <div className={styles["single-blog-text-content"]}>
            <p>
              <span className={styles["author-span-single-blog"]}>
                <ImUser />
                {singleBlog?.author} at <RxCalendar />
                {singleBlog?.createdAt.split("T")[0]}
              </span>
            </p>
            <h3>{singleBlog?.title}</h3>
            <p>{desc}</p>
          </div>
        </Card>
      </div>
    </section>
  );
}
