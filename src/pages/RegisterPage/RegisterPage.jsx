import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import ModalWithForm from "../../components/ModalWithForm/ModalWithForm";

function RegisterPage({ isOpen, onClose, onSuccess, onSwitchToLogin }) {
  const { register } = useAuth();
  const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation();
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    try {
      await register({ name: values.name, email: values.email, password: values.password });
      resetForm();
      onSuccess();
    } catch {
      setSubmitError("Could not create your account.");
    }
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Create your account"
      name="register"
      buttonText="Sign up"
      onSubmit={handleSubmit}
      isValid={isValid}
      footer={
        <p className="modal-form__switch">
          Already have an account?{" "}
          <button type="button" onClick={onSwitchToLogin}>
            Log in
          </button>
        </p>
      }
    >
      <div className="modal-form-field">
        <label htmlFor="register-name">Name</label>
        <input
          id="register-name"
          name="name"
          type="text"
          placeholder="Your full name"
          value={values.name || ""}
          onChange={handleChange}
          required
          minLength={2}
        />
        {errors.name && <p className="modal-form-field__error">{errors.name}</p>}
      </div>
      <div className="modal-form-field">
        <label htmlFor="register-email">Email</label>
        <input
          id="register-email"
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
        <label htmlFor="register-password">Password</label>
        <input
          id="register-password"
          name="password"
          type="password"
          placeholder="Create a password"
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

export default RegisterPage;
