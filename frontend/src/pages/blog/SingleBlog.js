import { useParams } from "react-router-dom";
import styles from "./SingleBlog.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { blogLike, getSingleBlog } from "../../redux/feactures/blog/blogSlice";
import { useEffect, useState, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import { Card } from "../../components/card/Card";
import { ImUser } from "react-icons/im";
import { RxCalendar } from "react-icons/rx";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import Loader from "../../components/loader/Loader";

function removeHTMLTagsAndEntities(input) {
  const tagRegex = /<[^>]+>/g;
  let result = input.replace(tagRegex, "");

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

export default function SingleBlog() {
  const [likeState, setLikeState] = useState({ liked: false, likes: 0 });
  const [isLiking, setIsLiking] = useState(false);
  const blogState = useSelector((state) => state.blog);
  const { id } = useParams();
  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state.blog);

  const singleBlog = blogState.blog?._id === id ? blogState.blog : null;
  console.log("SINGLE BLOG", singleBlog);

  const desc = useMemo(
    () => removeHTMLTagsAndEntities(singleBlog?.textDescription || ""),
    [singleBlog?.textDescription]
  );

  useEffect(() => {
    if (!singleBlog) {
      dispatch(getSingleBlog(id));
    }
  }, [dispatch, id, singleBlog]);

  useEffect(() => {
    if (singleBlog) {
      const userId = localStorage.getItem("userId");
      const liked = singleBlog.likedBy?.includes(userId) || false;
      setLikeState({ liked, likes: singleBlog.likes || 0 });
    }
  }, [singleBlog]);

  const handleClick = async (id, event) => {
    event.preventDefault();

    setIsLiking(true);

    let userId = localStorage.getItem("userId");
    if (!userId) {
      userId = uuidv4();
      localStorage.setItem("userId", userId);
    }
    const formData = { userId };

    // Optimistic UI update
    setLikeState((prevState) => {
      const liked = !prevState.liked;
      const likes = liked
        ? prevState.likes + 1
        : Math.max(prevState.likes - 1, 0);
      return { liked, likes };
    });

    try {
      // Perform the API request
      await dispatch(blogLike({ id, formData }));
    } catch (error) {
      // Revert optimistic UI update in case of an error
      setLikeState((prevState) => {
        const liked = !prevState.liked;
        const likes = liked
          ? prevState.likes - 1
          : Math.max(prevState.likes + 1, 0);
        return { liked, likes };
      });
      console.error("Failed to update like state", error);
    } finally {
      setIsLiking(false);
    }
  };

  if (blogState.isLoading && !isLiking) {
    return <div>Loading...</div>;
  }

  if (blogState.isError) {
    return <div>Error loading blog</div>;
  }

  return (
    <section className={styles["single-blog-section"]}>
      <div className={styles["single-blog-container"]}>
        <Card cardClass={styles["card-container"]}>
          <div className={styles["vid-img-wrapper"]}>
            {singleBlog?.photo && (
              <img src={singleBlog.photo} alt="blogPhoto" />
            )}
            {singleBlog?.video && (
              <video
                controls
                controlsList="nodownload"
                loop
                src={singleBlog.video}
              ></video>
            )}
          </div>
          <div className={styles["single-blog-text-content"]}>
            <p>
              <span className={styles["author-span-single-blog"]}>
                <ImUser /> {singleBlog?.author} at <RxCalendar />{" "}
                {singleBlog?.createdAt?.split("T")[0]}
              </span>
            </p>
            <h3>{singleBlog?.title}</h3>
            <p>{desc}</p>

            <div className={styles["likes-btn"]}>
              <button
                type="button"
                className={`--btn ${
                  styles[
                    likeState?.liked ? "btn-filled-like" : "btn-outlined-like"
                  ]
                }`}
                onClick={(event) => handleClick(id, event)}
                disabled={isLiking}
              >
                {likeState.liked ? (
                  <FavoriteIcon className={styles["filled-icon"]} />
                ) : (
                  <FavoriteBorderIcon className={styles["outline-icon"]} />
                )}
              </button>
              <span>
                {likeState?.likes === 1 || likeState?.likes === 0
                  ? `${likeState?.likes} Like`
                  : `${likeState?.likes} Likes`}
              </span>
              <span className={styles["blog-view"]}>
                <VisibilityOutlinedIcon />{" "}
                {singleBlog?.views === 1 || singleBlog?.views === 0
                  ? `${singleBlog?.views} View`
                  : `${singleBlog?.views} Views`}
              </span>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
