import { useSelector } from "react-redux";
import { selectUser } from "../../redux/feactures/auth/authSlice";
import { Link } from "react-router-dom";

export default function AdminOnlyRoute({ children }) {
  const user = useSelector(selectUser);

  const userRole = user?.role;

  if (userRole === "admin") {
    return children;
  } else {
    return (
      <section style={{ height: "80vh" }}>
        <div className="adminOnlyContainer">
          <h2>Permission Denied</h2>
          <p>This page can only be viewed by an admin user.</p>
          <br />
          <Link to="/">
            <button className="--btn">&larr; Back To Home</button>
          </Link>
        </div>
      </section>
    );
  }
}
