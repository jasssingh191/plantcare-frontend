import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../../assets/leaf-logo.png";
import { useAuth } from "../../contexts/AuthContext";
import Modal from "../Modal/Modal";
import LoginPage from "../../pages/LoginPage/LoginPage";
import RegisterPage from "../../pages/RegisterPage/RegisterPage";
import "./Navbar.css";

function getInitials(name) {
  return name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function Navigation() {
  const { user, logout } = useAuth();
  const [authView, setAuthView] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  const navLinkClass = ({ isActive }) =>
    isActive ? "nav-link active" : "nav-link";

  const authControls = user ? (
    <div className="auth auth--signed-in">
      <span className="avatar" title={user.name}>
        {getInitials(user.name)}
      </span>
      <button
        type="button"
        className="btn-icon"
        title="Log out"
        onClick={() => {
          logout();
          closeMenu();
        }}
      >
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
      </button>
    </div>
  ) : (
    <div className="auth">
      <button
        type="button"
        className="btn-pill btn-secondary"
        onClick={() => {
          setAuthView("login");
          closeMenu();
        }}
      >
        Log in
      </button>
      <button
        type="button"
        className="btn-pill btn-primary"
        onClick={() => {
          setAuthView("register");
          closeMenu();
        }}
      >
        Sign up
      </button>
    </div>
  );

  return (
    <div className="navbar-wrap">
      <nav className="navbar">
        <Link to="/" className="logo" onClick={closeMenu}>
          <img src={logo} alt="PlantCare Logo" className="logo__image" />
          <span>PlantCare</span>
        </Link>

        <div className="navbar__links">
          <ul className="nav-links">
            <li>
              <NavLink to="/" className={navLinkClass} end>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/explore" className={navLinkClass}>
                Explore
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={navLinkClass}>
                About
              </NavLink>
            </li>
          </ul>

          {authControls}
        </div>

        <button
          type="button"
          className="navbar__menu-toggle"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? (
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </nav>

      {menuOpen && (
        <div className="navbar__mobile-menu">
          <NavLink to="/" className={navLinkClass} end onClick={closeMenu}>
            Home
          </NavLink>
          <NavLink to="/explore" className={navLinkClass} onClick={closeMenu}>
            Explore
          </NavLink>
          <NavLink to="/about" className={navLinkClass} onClick={closeMenu}>
            About
          </NavLink>
          <div className="navbar__mobile-auth">{authControls}</div>
        </div>
      )}

      <Modal isOpen={authView !== null} onClose={() => setAuthView(null)}>
        {authView === "login" ? (
          <LoginPage
            onSuccess={() => setAuthView(null)}
            onSwitchToRegister={() => setAuthView("register")}
          />
        ) : null}
        {authView === "register" ? (
          <RegisterPage
            onSuccess={() => setAuthView(null)}
            onSwitchToLogin={() => setAuthView("login")}
          />
        ) : null}
      </Modal>
    </div>
  );
}

export default Navigation;
