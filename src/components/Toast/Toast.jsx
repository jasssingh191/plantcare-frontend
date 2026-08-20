import { Link } from "react-router-dom";
import "./Toast.css";

function Toast({ message, actionLabel, actionTo, onDismiss }) {
  return (
    <div className="toast" role="status">
      <span className="toast__message">{message}</span>
      {actionTo ? (
        <Link to={actionTo} className="toast__action" onClick={onDismiss}>
          {actionLabel}
        </Link>
      ) : null}
      <button
        type="button"
        className="toast__close"
        aria-label="Dismiss"
        onClick={onDismiss}
      >
        &times;
      </button>
    </div>
  );
}

export default Toast;
