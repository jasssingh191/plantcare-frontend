import { useState } from "react";
import { Link } from "react-router-dom";
import favoriteDefaultIcon from "../../assets/favorite-default.png";
import favoriteHoverIcon from "../../assets/favorite-hover.png";
import favoriteMarkedIcon from "../../assets/favorite-marked.png";
import closeDefaultIcon from "../../assets/close-default.png";
import closeHoverIcon from "../../assets/close-hover-click.png";
import "./PlantCard.css";

function PlantCard({ id, name, sci, imageUrl, showRemove = false, onRemove }) {
  const [imageFailed, setImageFailed] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isRemoveHovering, setIsRemoveHovering] = useState(false);
  const showImage = Boolean(imageUrl) && !imageFailed;

  const favoriteIcon = isFavorited
    ? favoriteMarkedIcon
    : isHovering
    ? favoriteHoverIcon
    : favoriteDefaultIcon;

  const removeIcon = isRemoveHovering ? closeHoverIcon : closeDefaultIcon;

  return (
    <article className="plant-card">
      <Link to={`/plant/${id}`} className="plant-card__link">
        <div className="plant-card__preview">
          {showImage && (
            <img
              src={imageUrl}
              alt={name}
              className="plant-card__image"
              onError={() => setImageFailed(true)}
            />
          )}

          {showRemove ? (
            <button
              type="button"
              className="plant-card__remove"
              aria-label={`Remove ${name} from your shelf`}
              onMouseEnter={() => setIsRemoveHovering(true)}
              onMouseLeave={() => setIsRemoveHovering(false)}
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                if (onRemove) onRemove(id);
              }}
            >
              <img
                src={removeIcon}
                alt=""
                className="plant-card__remove-icon"
                draggable={false}
              />
            </button>
          ) : (
            <button
              type="button"
              className="plant-card__favorite"
              aria-pressed={isFavorited}
              aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                setIsFavorited((prev) => !prev);
              }}
            >
              <img
                src={favoriteIcon}
                alt=""
                className="plant-card__favorite-icon"
                draggable={false}
              />
            </button>
          )}
        </div>
        <div className="plant-card__body">
          <h3 className="plant-card__name">{name}</h3>
          {sci ? <p className="plant-card__scientific">{sci}</p> : null}
        </div>
      </Link>
    </article>
  );
}

export default PlantCard;
