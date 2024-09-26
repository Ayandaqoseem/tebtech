import { useState } from "react";
import { Card } from "../../components/card/Card";
import styles from "../auth/Auth.module.scss";
import Loader from "../../components/loader/Loader";
import { unsubscribe } from "../../redux/feactures/auth/authSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function Unsubscribe() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const URLemail = params.get("email");
  const [emailState, setEmailState] = useState({
    email: URLemail,
  });

  const { isLoading, isSuccess } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const Unsubscribe = async (e) => {
    e.preventDefault();

    await dispatch(
      unsubscribe({
        email: emailState.email,
      })
    );
    if (isSuccess) {
      navigate("/");
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles["main-container"]}>
        <div className={styles["slide-up-wrapper"]}>
          <Card cardClass={styles.card}>
            <div className={styles.form}>
              <h2>Unsubscribe</h2>
              <form onSubmit={Unsubscribe}>
                <label className={styles.input}>
                  <input
                    type={"text"}
                    placeholder="Email"
                    className={styles.pwd}
                    name="email"
                    value={emailState.email}
                    onChange={(e) =>
                      setEmailState({ ...emailState, email: e.target.value })
                    }
                  />
                </label>
                <button className="--btn --btn-primary --btn-block">
                  Submit
                </button>
              </form>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
