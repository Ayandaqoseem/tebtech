import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { Card } from "../../components/card/Card";
import styles from "./Auth.module.scss";
import { useState } from "react";
import { validateEmail } from "../../components/utils";

export default function Contact() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const LoginUser = (e) => {
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
    console.log(userData);
  };

  return (
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
              <button type="submit" className="--btn --btn-primary --btn-block">
                Login
              </button>
            </form>

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
  );
}
