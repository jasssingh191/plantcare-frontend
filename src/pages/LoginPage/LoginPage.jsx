import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import ModalWithForm from "../../components/ModalWithForm/ModalWithForm";

function LoginPage({ isOpen, onClose, onSuccess, onSwitchToRegister }) {
  const { login } = useAuth();
  const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation();
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    try {
      await login({ email: values.email, password: values.password });
      resetForm();
      onSuccess();
    } catch {
      setSubmitError("Invalid email or password.");
    }
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Log in to PlantCare"
      name="login"
      buttonText="Log in"
      onSubmit={handleSubmit}
      isValid={isValid}
      footer={
        <p className="modal-form__switch">
          Don't have an account?{" "}
          <button type="button" onClick={onSwitchToRegister}>
            Sign up
          </button>
        </p>
      }
    >
      <div className="modal-form-field">
        <label htmlFor="login-email">Email</label>
        <input
          id="login-email"
          name="email"
          type="email"
          placeholder="name@email.com"
          value={values.email || ""}
          onChange={handleChange}
          required
        />
        {errors.email && <p className="modal-form-field__error">{errors.email}</p>}
      </div>
      <div className="modal-form-field">
        <label htmlFor="login-password">Password</label>
        <input
          id="login-password"
          name="password"
          type="password"
          placeholder="Enter your password"
          value={values.password || ""}
          onChange={handleChange}
          required
          minLength={6}
        />
        {errors.password && <p className="modal-form-field__error">{errors.password}</p>}
      </div>
      {submitError && <p className="modal-form__error">{submitError}</p>}
    </ModalWithForm>
  );
}

export default LoginPage;
