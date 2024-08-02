import styles from "./Loader.module.scss";
import ReactDOM from "react-dom";
import loaderImg from "../../assets/loader.gif";

export default function Loader() {
  return ReactDOM.createPortal(
    <div className={styles.wrapper}>
      <div className={styles.loader}>
        <img src={loaderImg} alt="Loading..." />
      </div>
    </div>,
    document.getElementById("loader")
  );
}

export const Spinner = () => {
  return (
    <div className="">
      <img className="--sm-spinner" src={loaderImg} alt="Loading..." />
    </div>
  );
};
