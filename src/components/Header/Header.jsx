import React from "react";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <h1 className="header__title">🌱 PlantCare</h1>
        <p className="header__subtitle">
          Search and manage your plant care collection
        </p>
      </div>
    </header>
  );
}

export default Header;
