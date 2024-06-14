import { useEffect, useState } from "react";
import { Card } from "../../components/card/Card";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import styles from "./Auth.module.scss";
import Loader from "../../components/loader/Loader"
import { toast } from "react-toastify";
import { validateEmail } from "../../components/utils";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RESET_AUTH, register } from "../../redux/feactures/auth/authSlice";

const initialstate = {
  name: "",
  email: "",
  password: "",
  cPassword: "",
};

export default function Register() {
  const [formData, setFormData] = useState(initialstate);
  const { name, email, password, cPassword } = formData;
  const [showPassword, setShowPassword] = useState(false);

  const { isLoading, isLoggedIn, isSuccess } = useSelector((state) => state.auth);


  const dispatch = useDispatch();
  const navigate = useNavigate()

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const RegisterUser = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      return toast.warning("All fields are required");
    }
    if (password.length < 8) {
      return toast.warning("Password must be up to 8 characters");
    }
    if (!validateEmail(email)) {
      return toast.warning("Please enter a valid email");
    }
    if (password !== cPassword) {
      return toast.warning("Password do not match.");
    }

    const userData = {
      name,
      email,
      password,
    };

    await dispatch(register(userData));
  };

  useEffect(() => {
    if(isSuccess && isLoggedIn) {
      navigate("/")
    }

    dispatch(RESET_AUTH());
  }, [isLoggedIn, isSuccess, dispatch, navigate]);


  return (
    <>
    {isLoading && <Loader />}
    <div className={styles["main-container"]}>
      <div className={styles["slide-up-wrapper"]}>
        <Card cardClass={styles.card}>
          <div className={styles.form}>
            <h2>Register</h2>
            <form onSubmit={RegisterUser}>
              <input
                type="text"
                placeholder="Name"
                className={styles.input}
                name="name"
                value={name}
                onChange={handleInputChange}
              />
              <input
                type="text"
                placeholder="Email"
                className={styles.input}
                name="email"
                value={email}
                onChange={handleInputChange}
              />
              <label className={styles.input}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className={styles.pwd}
                  name="password"
                  value={password}
                  onChange={handleInputChange}
                />
                <span onClick={toggleShowPassword}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </label>
              <label className={styles.input}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  className={styles.pwd}
                  name="cPassword"
                  value={cPassword}
                  onChange={handleInputChange}
                />
                {/* <span onClick={toggleShowPassword}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span> */}
              </label>
              <button className="--btn --btn-primary --btn-block">
                Register
              </button>
            </form>

            <span className={styles.register}>
              <p>Already have an account?</p>
              <Link to={"/login"} className={styles.link}>
                Login
              </Link>
            </span>
          </div>
        </Card>
      </div>
    </div>
    </>
  );
}
