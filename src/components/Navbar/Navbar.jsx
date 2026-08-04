import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar__list">
        <li className="navbar__item">
          <Link to="/">Home</Link>
        </li>
        <li className="navbar__item">
          <Link to="/about">About</Link>
        </li>
        <li className="navbar__item">
          <Link to="/profile">Profile</Link>
        </li>
        <li className="navbar__item">
          <Link to="/login">Log In</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
