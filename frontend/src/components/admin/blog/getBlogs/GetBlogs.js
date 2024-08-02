import { useEffect, useState } from "react";
import styles from "./GetBlogs.module.scss";
import { useDispatch, useSelector } from "react-redux";
// import { confirmAlert } from "react-confirm-alert";
import {
  deleteBlog,
  getBlogs,
  updateBlog,
} from "../../../../redux/feactures/blog/blogSlice";
import Loader, { Spinner } from "../../../loader/Loader";
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Card } from "../../../card/Card";
import BlogPostModel from "../../../model/blogPostModel";



export default function GetBlogs() {
  const dispatch = useDispatch();

  const [isPublished, setIsPublished] = useState("");
  const [selectedBlogId, setSelectedBlogId] = useState(null);
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const { blogs, isLoading } = useSelector((state) => state.blog);

  console.log("selectedBlogId", selectedBlogId);

  const handlePost = (_id) => {
    setSelectedBlogId(_id);
    setShow(true);
    console.log("Show set to true, selectedBlogId:", _id);
  };

  const handleSubmitPost = async (e) => {
    e.preventDefault();
    console.log(selectedBlogId, isPublished);

    const formData = {
      isPublished,
    };
    if (selectedBlogId && isPublished !== "") {
      await dispatch(
        updateBlog({
          id: selectedBlogId,
          formData,
        })
      );
      setIsPublished("");
      setSelectedBlogId(null);
      setShow(false);
    }
  };

  const delBlog = async () => {
    await dispatch(deleteBlog(selectedBlogId));
    await dispatch(getBlogs());
    setSelectedBlogId(null)
    setShowDelete(false)
  };

  const confirmDelete = (id) => {
    setShowDelete(!showDelete)
    setSelectedBlogId(id)
    // confirmAlert({
    //   title: "Delete Product",
    //   message: "Are you sure you want to delete this product.",
    //   buttons: [
    //     {
    //       label: "Delete",
    //       onClick: () => delBlog(id),
    //     },
    //     {
    //       label: "Cancel",
    //     },
    //   ],
    // });
  };

  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);

  return (
    <div className={styles["get-blog-container"]}>
      <h3>All Blogs</h3>
      {isLoading && <Loader />}
      <div className={styles.table}>
        {Array.isArray(blogs) && blogs.length === 0 ? (
          <p>No Blogs Found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>s/n</th>
                <th>Title</th>
                <th>Likes</th>
                <th>Views</th>
                <th>Publish</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(blogs) &&
                blogs.map((blog, index) => {
                  const { _id, title, likes, views, isPublished } = blog;
                  return (
                    <tr key={_id}>
                      <td>{index + 1}</td>
                      <td>{title}</td>
                      <td>{likes}</td>
                      <td>{views}</td>
                      <td>
                        <button
                          className={
                            isPublished
                              ? `--btn ${styles.posted} ${styles["blog-publish-btn"]}`
                              : `--btn ${styles.cancel} ${styles["blog-publish-btn"]}`
                          }
                          onClick={() => handlePost(_id)}
                        >
                          {isPublished ? "Posted" : "Disabled"}
                        </button>
                      </td>
                      <td className={styles.icons}>
                        <span>
                          <Link to={`/admin/dashboard/edit-blog/${_id}`}>
                            <FaEdit size={20} color={"green"} />
                          </Link>
                        </span>
                        <span>
                          <FaTrashAlt
                            size={20}
                            color={"red"}
                            onClick={() => confirmDelete(_id)}
                          />
                        </span>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        )}
      </div>
      {show && (
        <div className={styles["publish-container"]}>
          <Card cardClass={styles["change-publish-card"]}>
            <p>Publish the post by setting status to true</p>
            <form onSubmit={handleSubmitPost}>
              <span>
                <select
                  value={isPublished}
                  onChange={(e) => setIsPublished(e.target.value)}
                >
                  <option value="" disabled>
                    -- Choose one --
                  </option>
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </span>
              <button type="submit" className="--btn --btn-primary --btn-block">
                {isLoading ? (
                  <Spinner className={styles["blog-publish-spinner"]} />
                ) : (
                  "Publish"
                )}
              </button>
            </form>
          </Card>
        </div>
      )}

      {showDelete && (
       <BlogPostModel
        setShowDelete={setShowDelete}
        delBlog={delBlog}
       />
      )}
    </div>
  );
}
