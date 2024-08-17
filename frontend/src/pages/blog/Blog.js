import { useEffect, useState, useMemo } from "react";
import styles from "./Blog.module.scss";
import { Card } from "../../components/card/Card";
import { useDispatch, useSelector } from "react-redux";
import { blogLike, getBlogs } from "../../redux/feactures/blog/blogSlice";
import { useNavigate } from "react-router-dom";
import { ImUser } from "react-icons/im";
import { v4 as uuidv4 } from "uuid";
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
  const [likeStates, setLikeStates] = useState({});
  const { blogs } = useSelector((state) => state.blog);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading } = useSelector((state) => state.blog);
  const publishedBlogs = useMemo(() => {
    return Array.isArray(blogs) ? blogs.filter((blog) => blog.isPublished) : [];
  }, [blogs]);

  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);

  useEffect(() => {
    if (publishedBlogs.length > 0) {
      const initialLikeStates = {};
      publishedBlogs.forEach((blog) => {
        const userId = localStorage.getItem("userId");
        const liked = blog.likedBy.includes(userId);
        initialLikeStates[blog._id] = {
          liked,
          likes: blog.likes || 0,
        };
      });
      setLikeStates(initialLikeStates);
    }
  }, [publishedBlogs]);

  const handleLearnMore = (id) => {
    navigate(`/blog/${id}`);
  };

  const handleClick = async (id) => {
    let userId = localStorage.getItem("userId");
    if (!userId) {
      userId = uuidv4();
      localStorage.setItem("userId", userId);
    }
    const formData = { userId };

    // Optimistic UI update
    setLikeStates((prevState) => {
      const liked = !prevState[id].liked;
      const likes = liked
        ? prevState[id].likes + 1
        : Math.max(prevState[id].likes - 1, 0);
      return {
        ...prevState,
        [id]: { liked, likes },
      };
    });

    try {
      // Perform the API request
      await dispatch(blogLike({ id, formData }));
    } catch (error) {
      // Revert optimistic UI update in case of an error
      setLikeStates((prevState) => {
        const liked = !prevState[id].liked;
        const likes = liked
          ? prevState[id].likes - 1
          : Math.max(prevState[id].likes + 1, 0);
        return {
          ...prevState,
          [id]: { liked, likes },
        };
      });
      console.error("Failed to update like state", error);
    }
  };
  return (
    <>
      {/* {isLoading && <Loader />} */}

      <div className={styles["blog-container"]}>
        <Card cardClass={styles["card-container"]}>
          <div>
            <div>
              {publishedBlogs.map((blog) => {
                const {
                  _id,
                  title,
                  video,
                  photo,
                  textDescription,
                  author,
                  createdAt,
                  views,
                } = blog;
                const desc = removeHTMLTagsAndEntities(textDescription);
                const newVideo = getEmbedUrl(video);
                const likeState = likeStates[_id] || {
                  liked: false,
                  likes: blog.likes,
                };

                return (
                  <div key={_id} className={styles["blog-post"]}>
                    <div className={styles["blog-content-wrapper"]}>
                      <div className={styles["blog-content"]}>
                        <img src={photo} alt="blogPhoto" />
                        <div className={styles["blog-text-content"]}>
                          <p>
                            <span className={styles["author-span"]}>
                              <ImUser />
                              {author} at <RxCalendar />
                              {createdAt.split("T")[0]}
                            </span>
                          </p>
                          <h3>{title}</h3>
                          <p>{desc?.substring(0, 400).concat("...")}</p>
                          <div className={styles["likes-btn"]}>
                            <button
                              type="button"
                              className={`--btn ${
                                styles[
                                  likeState.liked
                                    ? "btn-filled-like"
                                    : "btn-outlined-like"
                                ]
                              }`}
                              onClick={() => handleClick(_id)}
                            >
                              {likeState.liked ? (
                                <FavoriteIcon
                                  className={styles["filled-icon"]}
                                />
                              ) : (
                                <FavoriteBorderIcon
                                  className={styles["outline-icon"]}
                                />
                              )}
                            </button>
                            <span>
                              {likeState.likes === 1 || likeState.likes === 0
                                ? `${likeState.likes} Like`
                                : `${likeState.likes} Likes`}
                            </span>
                            <span className={styles["blog-view"]}>
                              <VisibilityOutlinedIcon />
                              {views === 1 || views === 0 || views === null
                                ? `${views || 0} View`
                                : `${views} Views`}
                            </span>
                          </div>
                          <button
                            type="submit"
                            className="--btn-secondary --btn"
                            onClick={() => handleLearnMore(_id)}
                          >
                            Learn More
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className={styles.hr}></div>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
