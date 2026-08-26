import { useState } from "react";
import { Link } from "react-router-dom";
import PlantList from "../../components/PlantList/PlantList";
import { useAuth } from "../../contexts/AuthContext";
import "./ProfilePage.css";

function getInitials(name) {
  return name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function ProfilePage() {
  const { user, userShelf, removeFromShelf } = useAuth();
  const [isEditingShelf, setIsEditingShelf] = useState(false);

  return (
    <section className="profile-page">
      <div className="profile-page__user-row">
        <div className="profile-page__user-info">
          <span className="profile-page__avatar">{getInitials(user.name)}</span>
          <span className="profile-page__name">{user.name}</span>
        </div>
        <button type="button" className="btn-pill btn-secondary">
          Edit profile
        </button>
      </div>

      <div className="profile-page__shelf-header">
        <h2 className="profile-page__shelf-title">My Plant Shelf</h2>
        {userShelf.length > 0 && (
          <button
            type="button"
            className="btn-pill btn-secondary"
            onClick={() => setIsEditingShelf((prev) => !prev)}
          >
            {isEditingShelf ? "Done" : "Edit shelf"}
          </button>
        )}
      </div>

      {userShelf.length === 0 ? (
        <p className="profile-page__empty">
          You haven't added any plants yet. Browse the{" "}
          <Link to="/explore">plant directory</Link> and tap "Add to my
          shelf" on a plant you love.
        </p>
      ) : (
        <PlantList
          plants={userShelf}
          showRemove={isEditingShelf}
          onRemove={removeFromShelf}
        />
      )}
    </section>
  );
}

export default ProfilePage;
