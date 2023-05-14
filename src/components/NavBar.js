import { Link } from "react-router-dom";
import Logo from "./Logo";
import "../styles/navBar.css";
import { FaRegUser } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import Hamburger from "hamburger-react";

export default function NavBar({ isLoggedIn, userObj = null }) {
  const [hamburgerOpenTrigger, setHamburgerOpenTrigger] = useState(false);
  const [isHamburgerShown, setIsHamburgerShown] = useState(false);
  const [isMenuShown, setIsMenuShown] = useState(false);

  const menuItems = [
    { name: "academics", url: "/academics" },
    { name: "community", url: "/community" },
    { name: "about us", url: "/aboutus" },
  ];

  const handleSearch = (event) => {
    event.preventDefault();
    console.log("searching...");
  };

  const handleMenuOpen = () => {
    setIsMenuShown(true);
  };

  const handleMenuClose = () => {
    const menu = document.querySelector(".menu-container");
    menu.className = "menu-container hide";
    setTimeout(() => setIsMenuShown(false), 200);
  };

  const handleSetHamberger = (bool) => {
    if (bool) {
      setHamburgerOpenTrigger(true);
    } else {
      const hamburger = document.querySelector(".hamburger-container");
      hamburger.className = "hamburger-container hide";
      setHamburgerOpenTrigger(false);
    }
  };

  useEffect(() => {
    if (hamburgerOpenTrigger) {
      setIsHamburgerShown(true);
    } else {
      setTimeout(() => setIsHamburgerShown(false), 200);
    }
  }, [hamburgerOpenTrigger]);

  return (
    <header>
      <div className="navbar container">
        <ul>
          <div className="display-desktop">
            <li>
              <Link className="link logo-link" to="/">
                <Logo size="32px" id="main-logo" />
                <h6 className="logo-title">St. M Globe</h6>
              </Link>
            </li>
            <div className="navigation">
              {menuItems.map((menu) => (
                <li className="navigator">
                  <button className="nav-button">
                    <Link to={menu.url} className="nav-link">
                      {menu.name.toUpperCase()}
                    </Link>
                  </button>
                </li>
              ))}
            </div>
          </div>

          <ul className="display-mobile">
            <li className="hamburger-toggle">
              <Hamburger
                toggled={hamburgerOpenTrigger}
                toggle={handleSetHamberger}
                size={20}
                color="white"
              />
            </li>
            <li className="main-logo-container">
              <Link className="link logo-link" to="/">
                <Logo size="32px" id="main-logo" />
                <h6 className="logo-title">St. M Globe</h6>
              </Link>
            </li>
          </ul>

          <div className="searchbox-container display-desktop">
            <form onSubmit={handleSearch} className="searchbox-form">
              <input
                type="text"
                placeholder="Search..."
                className="searchbox-input"
              />
              <IoSearchSharp
                size="20px"
                color="#757575"
                className="searchbox-btn"
                onClick={handleSearch}
              />
            </form>
          </div>

          {isLoggedIn ? (
            <div className="profile-link" onClick={handleMenuOpen}>
              <div className="profile-container">
                <img
                  src={userObj.profilePhotoURL}
                  alt="Profile"
                  className="profile-img"
                />
              </div>
            </div>
          ) : (
            <Link className="navigator-signin-container" to="/signin">
              <li className="navigator-link-wrapper">
                <FaRegUser
                  size="18px"
                  className="navigator-logo"
                  color="white"
                />
                <div className="navigator-text">LOG IN</div>
              </li>
            </Link>
          )}
        </ul>
      </div>
      {isMenuShown && (
        <div>
          <div className="menu-background" onClick={handleMenuClose}></div>
          <ul className="menu-container">
            <li className="menu-item" onClick={handleMenuClose}>
              <Link to="/profile" className="menu-link">
                Profile
              </Link>
            </li>
            <li className="menu-item" onClick={handleMenuClose}>
              <Link to="/account" className="menu-link">
                Account
              </Link>
            </li>
            <li className="menu-item" onClick={handleMenuClose}>
              <Link to="/logout" className="menu-link">
                Log Out
              </Link>
            </li>
          </ul>
        </div>
      )}
      {isHamburgerShown && (
        <div className="display-mobile">
          <div
            className="hamburger-background"
            onClick={() => handleSetHamberger(false)}
          ></div>
          <ul className="hamburger-container">
            {menuItems.map((menu) => (
              <li
                className="menu-item"
                onClick={() => handleSetHamberger(false)}
              >
                <Link to={menu.url} className="menu-link">
                  {menu.name.replace(/\b\w/g, (l) => l.toUpperCase())}
                </Link>
              </li>
            ))}
            <li className="searchbox-item">
              <div className="searchbox-container">
                <form onSubmit={handleSearch} className="searchbox-form">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="searchbox-input"
                  />
                  <IoSearchSharp
                    size="20px"
                    color="#757575"
                    className="searchbox-btn"
                    onClick={handleSearch}
                  />
                </form>
              </div>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
