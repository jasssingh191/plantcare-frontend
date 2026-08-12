import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./RegisterPage.css";

function RegisterPage({ onSuccess, onSwitchToLogin }) {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await register({ name, email, password });
      if (onSuccess) onSuccess();
      else navigate("/");
    } catch {
      setError("Could not create your account.");
    }
  };

  const handleSwitch = () => {
    if (onSwitchToLogin) onSwitchToLogin();
    else navigate("/login");
  };

  return (
    <section className="register-page">
      <h2 className="register-page__title">Create your account</h2>
      <form className="register-page__form" onSubmit={handleSubmit}>
        <div className="register-page__field">
          <label htmlFor="register-name">Name</label>
          <input
            id="register-name"
            type="text"
            placeholder="Your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="register-page__field">
          <label htmlFor="register-email">Email</label>
          <input
            id="register-email"
            type="email"
            placeholder="name@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="register-page__field">
          <label htmlFor="register-password">Password</label>
          <input
            id="register-password"
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="register-page__error">{error}</p>}
        <button type="submit" className="register-page__submit">
          Sign up
        </button>
      </form>
      <p className="register-page__switch">
        Already have an account?{" "}
        <button type="button" onClick={handleSwitch}>
          Log in
        </button>
      </p>
    </section>
  );
}

export default RegisterPage;
