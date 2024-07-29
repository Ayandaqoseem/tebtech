import { useState } from "react";
import styles from "./Blog.module.scss";
import { Card } from "../../components/card/Card";


const initialState ={
title: "",
textDescription: "",
photo: "",
video: "",
publish: "",
views: "",
likes: "",

}
export default function Blog() {
  const [formData, setFormData] = useState(initialState)
  const { title, textDescription, photo, video, publish, views, likes } = formData;
  return (
    <div className={styles["blog-container"]}>
      <Card cardClass={styles["card-container"]}>
        <h1>Blog page</h1>

      </Card>
    </div>
  );
}
