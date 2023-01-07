import { Link } from "react-router-dom";

export default function NavBar({ isLoggedIn, userObj }) {
  return (
    <nav>
      <ul
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: 50,
          gap: 30,
        }}
      >
        <li>
          <Link to="/">Home</Link>
        </li>

        {isLoggedIn ? (
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
