import styles from "./HomeFooter.module.scss";

export default function HomeFooter() {
  return (
    <div className={styles["footer-gen-conatiner"]}>
      <div className={styles["footer-content-container"]}>
        <h2>Footer Content</h2>
      </div>
      <div className={styles["home-footer"]}></div>
      <div className={styles["home-footer-1"]}></div>
    </div>
  );
}
