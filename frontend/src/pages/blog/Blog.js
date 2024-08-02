import { useEffect } from "react";
import styles from "./Blog.module.scss";
import { Card } from "../../components/card/Card";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs } from "../../redux/feactures/blog/blogSlice";
// import decodeAndFormatHTML from "../../components/DecodeandFormatHTML";

function removeHTMLTagsAndEntities(input) {
  // Remove HTML tags
  const tagRegex = /<[^>]+>/g;
  let result = input.replace(tagRegex, "");

  // Decode HTML entities
  const entityMap = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&nbsp;': ' ',
  };

  result = result.replace(/&[^;]+;/g, match => entityMap[match] || match);

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

export default function Blog() {
  const { blogs } = useSelector((state) => state.blog);
  const dispatch = useDispatch();

  const publishedBlogs = Array.isArray(blogs)
    ? blogs.filter((blog) => blog.isPublished)
    : [];

  // console.log(publishedBlogs);
  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);

  return (
    <div className={styles["blog-container"]}>
      <Card cardClass={styles["card-container"]}>
        <div>
          {/* <h1>Blog page</h1> */}
          <div>
            {Array.isArray(publishedBlogs) &&
              publishedBlogs.map((blog) => {
                const { _id, title, video, photo, textDescription } = blog;
                const desc = removeHTMLTagsAndEntities(textDescription);
                const newVideo = getEmbedUrl(video);
                return (
                  <div key={_id} className={styles["blog-post"]}>
                    <div className={styles["blog-content"]}>
                      <img src={photo} alt="blogPhoto" />
                      <div>
                        <h3>{title}</h3>
                        <p>{desc}</p>
                      </div>
                    </div>
                    <div className={styles["blog-video"]}>
                      {newVideo ? (
                        <iframe
                          width="560"
                          height="315"
                          src={newVideo}
                          title="YouTube video player"
                          // style={{ border: "none" }}
                          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      ) : (
                        <video
                          controls
                          controlsList="nodownload"
                          // autoPlay
                          loop
                          src={video}
                          // style={{ width: "100%" }}
                        ></video>
                      )}
                    </div>
                      <div className={styles.hr}></div>
                  </div>
                );
              })}
          </div>
        </div>
      </Card>
    </div>
  );
}
