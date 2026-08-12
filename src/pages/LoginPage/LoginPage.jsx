import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./LoginPage.css";

function LoginPage({ onSuccess, onSwitchToRegister }) {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login({ email, password });
      if (onSuccess) onSuccess();
      else navigate("/");
    } catch {
      setError("Invalid email or password.");
    }
  };

  const handleSwitch = () => {
    if (onSwitchToRegister) onSwitchToRegister();
    else navigate("/register");
  };

  return (
    <section className="login-page">
      <h2 className="login-page__title">Log in to PlantCare</h2>
      <form className="login-page__form" onSubmit={handleSubmit}>
        <div className="login-page__field">
          <label htmlFor="login-email">Email</label>
          <input
            id="login-email"
            type="email"
            placeholder="name@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="login-page__field">
          <label htmlFor="login-password">Password</label>
          <input
            id="login-password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="login-page__error">{error}</p>}
        <button type="submit" className="login-page__submit">
          Log in
        </button>
      </form>
      <p className="login-page__switch">
        Don't have an account?{" "}
        <button type="button" onClick={handleSwitch}>
          Sign up
        </button>
      </p>
    </section>
  );
}

export default LoginPage;
