import Modal from "../Modal/Modal";
import "./ModalWithForm.css";

function ModalWithForm({
  isOpen,
  onClose,
  title,
  name,
  buttonText,
  onSubmit,
  isValid,
  children,
  footer,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="modal-form">
        <h2 className="modal-form__title">{title}</h2>
        <form className="modal-form__form" name={name} onSubmit={onSubmit} noValidate>
          {children}
          <button type="submit" className="modal-form__submit" disabled={!isValid}>
            {buttonText}
          </button>
        </form>
        {footer}
      </div>
    </Modal>
  );
}

export default ModalWithForm;
