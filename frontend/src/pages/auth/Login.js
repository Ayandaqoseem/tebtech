import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { Card } from "../../components/card/Card";
import styles from "./Auth.module.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { validateEmail } from "../../components/utils";
import {
  RESET_AUTH,
  googleLogin,
  login,
} from "../../redux/feactures/auth/authSlice";
import Loader from "../../components/loader/Loader";
import { FcGoogle } from "react-icons/fc";
import { getCartDB, saveCartDB } from "../../redux/feactures/product/cartSlice";

export default function Contact() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { isLoggedIn, isSuccess, isLoading, user } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [urlParams] = useSearchParams();
  // console.log(urlParams.get("redirect"));
  const redirect = urlParams.get("redirect");

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const LoginUser = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.warning("All fields are required");
    }
    if (!validateEmail(email)) {
      return toast.warning("Please enter a valid email");
    }

    const userData = {
      email,
      password,
    };
    await dispatch(login(userData));
  };

  const googleLoginHandler = () => {
    dispatch(googleLogin());
  };

  useEffect(() => {
    if (isLoggedIn && user && isSuccess) {
      //   if(redirect === "cart") {
      //     dispatch(saveCartDB({
      //       cartItems: JSON.parse(localStorage.getItem("cartItems"))
      //     }))
      //     return navigate("/shop")
      //   }else{
      //   if (user.role === "customer") {
      //     navigate("/profile");
      //   } else {
      //     navigate("/admin/dashboard/profile");
      //   }
      // }
      if (redirect === "cart") {
        dispatch(
          saveCartDB({
            cartItems: JSON.parse(localStorage.getItem("cartItems")),
          })
        );
        return navigate("/shop");
      }
     
      dispatch(getCartDB());
    }
  }, [isLoggedIn, user, navigate, dispatch, isSuccess, redirect]);

  useEffect(() => {
    dispatch(RESET_AUTH());
  }, [dispatch]);

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles["main-container"]}>
        <div className={styles["slide-down-wrapper"]}>
          <Card cardClass={styles.card}>
            <div className={styles.form}>
              <h2>Login</h2>
              <form onSubmit={LoginUser}>
                <input
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.input}
                />
                <label className={styles.input}>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    className={styles.pwd}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span onClick={toggleShowPassword}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </label>
                <button
                  type="submit"
                  className="--btn --btn-primary --btn-block"
                >
                  Login
                </button>
              </form>
              <div className={styles["google-btn"]}>
                <button
                  type="button"
                  className="--btn-google --btn-block"
                  onClick={googleLoginHandler}
                >
                  <FcGoogle size={18} />
                  Login With Google
                </button>
              </div>

              <span className={styles["forgot-pwd"]}>
                <Link to={"/forgot"} className={styles.link}>
                  Forgot Password
                </Link>
              </span>
              <span className={styles.register}>
                <p>Don't have an account?</p>
                <Link to={"/register"} className={styles.link}>
                  Register
                </Link>
              </span>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
