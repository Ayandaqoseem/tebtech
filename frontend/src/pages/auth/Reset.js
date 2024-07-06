import { toast } from "react-toastify";
import { Card } from "../../components/card/Card";
import styles from "./Auth.module.scss";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Loader from "../../components/loader/Loader";
import { forgotPassword } from "../../redux/feactures/auth/authSlice";
// import { auth } from "../firebase/Config";
// import { sendPasswordResetEmail } from "firebase/auth";

export default function Reset() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const resetPassword = async (e) => {
    e.preventDefault()
    setIsLoading(true);
    try {
      if(!email) {
        return toast.warning("Please enter your email")
      }
  
      const userData = {
        email,
      };
      setIsLoading(false);
      await dispatch(forgotPassword(userData));
      setEmail("")
    } catch (error) {

    } 

  };

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles["main-container"]}>
        <div className={styles["slide-down-wrapper"]}>
          <Card cardClass={styles.card}>
            <p className={styles["desc-text"]}>
              Lost your password? Please enter your email address. You will
              receive a link to create a new password via email.
            </p>
            <div className={styles.form}>
              <form onSubmit={resetPassword}>
                <input
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.input}
                />

                <button
                  type="submit"
                  className="--btn --btn-primary --btn-block"
                >
                  Reset Password
                </button>
              </form>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
