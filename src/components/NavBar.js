import { Link } from "react-router-dom";

export default function NavBar({ isLoggedIn }) {
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
        <li>
          <Link to="/stmnow">St. M Now</Link>
        </li>
        <li>
          <Link to="/school">School Related</Link>
        </li>
        <li>
          <Link to="/board">Board</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>

        {isLoggedIn ? (
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        ) : (
          <li>
            <Link to="/signin">Sign In</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
