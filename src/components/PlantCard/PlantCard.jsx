import "./PlantCard.css";

function PlantCard({ plant }) {
  return (
    <article className="plant-card">
      <div className="plant-card__preview">
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
          <path d="M12 2C7 4 4 9 4 14a8 8 0 0 0 16 0c0-5-3-10-8-12zm0 18a6 6 0 0 1-6-6c0-3.5 2-7 6-9 4 2 6 5.5 6 9a6 6 0 0 1-6 6z" />
        </svg>
      </div>
      <div className="plant-card__body">
        <h3 className="plant-card__name">{plant.name}</h3>
        <p className="plant-card__scientific">{plant.scientificName}</p>
        <div className="plant-card__badges">
          <span className="badge badge--water">
            <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
              <path d="M12 2c-4 5-7 9.5-7 13a7 7 0 0 0 14 0c0-3.5-3-8-7-13z" />
            </svg>
            Every {plant.wateringDays} days
          </span>
          <span className="badge badge--light">
            <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
              <path d="M12 2l1.8 5.2L19 9l-5.2 1.8L12 16l-1.8-5.2L5 9l5.2-1.8z" />
            </svg>
            {plant.light}
          </span>
        </div>
      </div>
    </article>
  );
}

export default PlantCard;
