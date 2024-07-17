import { useState } from "react";
import { Card } from "../../components/card/Card";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import styles from "./Auth.module.scss";
import Loader from "../../components/loader/Loader"
import { toast } from "react-toastify";
import { resetPassword } from "../../redux/feactures/auth/authSlice"
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


const initialstate = {
 
  password: "",
  cPassword: "",
};

export default function NewPassword() {
  const [formData, setFormData] = useState(initialstate);
  const { password, cPassword } = formData;
  const [showPassword, setShowPassword] = useState(false);

  const { isLoading, isSuccess } = useSelector((state) => state.auth);
  const { resetToken } = useParams()


  const dispatch = useDispatch();
  const navigate = useNavigate()

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const NewUserPassword = async (e) => {
    e.preventDefault();
    if (!password) {
      return toast.warning("All fields are required");
    }
    if (password.length < 8) {
      return toast.warning("Password must be up to 8 characters");
    }
    if (password !== cPassword) {
      return toast.warning("Password do not match.");
    }

  

    const userData = password;


    await dispatch(resetPassword({
        userData,
        resetToken,
    }));
    if (isSuccess) {
        navigate("/login")
    }
  };

  const handlePaste = (e) => {
    e.preventDefault()
    return toast.warning("Pasting is not allowed in the confirm password field")
  }

//   useEffect(() => {
//     if(isSuccess) {
//       navigate("/login")
//     }

//     dispatch(RESET_AUTH());
//   }, [isSuccess, dispatch, navigate]);


  return (
    <>
    {isLoading && <Loader />}
    <div className={styles["main-container"]}>
      <div className={styles["slide-up-wrapper"]}>
        <Card cardClass={styles.card}>
          <div className={styles.form}>
            <h2>New Password</h2>
            <form onSubmit={NewUserPassword}>
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
                  onPaste={handlePaste}
                />
                {/* <span onClick={toggleShowPassword}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span> */}
              </label>
              <button className="--btn --btn-primary --btn-block">
                New Password
              </button>
            </form>

            {/* <span className={styles.register}>
              <p>Already have an account?</p>
              <Link to={"/login"} className={styles.link}>
                Login
              </Link>
            </span> */}
          </div>
        </Card>
      </div>
    </div>
    </>
  );
}
