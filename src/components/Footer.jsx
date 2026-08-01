import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__copyright">
          © {new Date().getFullYear()} PlantCare. Developed for Stage 1.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
