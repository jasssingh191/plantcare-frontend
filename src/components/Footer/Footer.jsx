import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__copyright">
          © {new Date().getFullYear()} PlantCare. Developed by Jaspreet Singh.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
