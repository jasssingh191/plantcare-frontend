import { useState } from "react";
import { useParams } from "react-router-dom";
import PlantList from "../../components/PlantList/PlantList";
import Toast from "../../components/Toast/Toast";
import { useAuth } from "../../contexts/AuthContext";
import { fetchPlantDetails, fetchRegionalPlants } from "../../utils/plantApi";
import { getMockPlantDetails, REGION_PLANTS } from "../../utils/mockPlants";
import { useAsyncData } from "../../hooks/useAsyncData";
import "./PlantDetailPage.css";

const CARE_GUIDE_LABELS = [
  ["wateringFrequency", "Watering Frequency"],
  ["lightRequirements", "Light Requirements"],
  ["humidity", "Humidity"],
  ["idealTemperature", "Ideal Temperature"],
  ["soilType", "Soil Type"],
];

function PlantDetailPage() {
  const { id } = useParams();
  const { user, addToShelf, isInShelf, openAuthModal } = useAuth();
  const [toastMessage, setToastMessage] = useState(null);

  const { data: plant, isLoading } = useAsyncData(
    () => fetchPlantDetails(id),
    () => getMockPlantDetails(id),
    [id],
  );

  // Fetched once and re-filtered per plant at render time — no need to
  // refetch on every navigation, since it's the same cached "regional"
  // list either way (see plantApi.js).
  const { data: allRelatedPlants } = useAsyncData(fetchRegionalPlants, () => REGION_PLANTS);
  const relatedPlants = (allRelatedPlants || [])
    .filter((item) => String(item.id) !== String(id))
    .slice(0, 3);

  const handleAddToShelf = () => {
    if (!user) {
      openAuthModal("login");
      return;
    }

    addToShelf({ id: plant.id, name: plant.name, sci: plant.sci, imageUrl: plant.imageUrl });
    setToastMessage("Added to your plant shelf!");
  };

  if (isLoading) {
    return (
      <section className="plant-detail">
        <div className="plant-detail__hero plant-detail__hero--loading">
          <div className="plant-detail__hero-image plant-detail__hero-image--loading" />
          <div className="plant-detail__hero-info">
            <div className="skeleton-line skeleton-line--title" style={{ width: "60%", height: 28 }} />
            <div className="skeleton-line" style={{ width: "35%", marginTop: 12 }} />
            <div className="skeleton-line" style={{ width: "90%", marginTop: 24 }} />
            <div className="skeleton-line" style={{ width: "80%", marginTop: 8 }} />
          </div>
        </div>
      </section>
    );
  }

  if (!plant) {
    return (
      <section className="plant-detail">
        <p className="plant-detail__status">Nothing found or something went wrong.</p>
      </section>
    );
  }

  const alreadyInShelf = Boolean(user) && isInShelf(plant.id);

  return (
    <section className="plant-detail">
      <div className="plant-detail__hero">
        <div className="plant-detail__hero-image">
          {plant.imageUrl ? (
            <img src={plant.imageUrl} alt={plant.name} className="plant-detail__image" />
          ) : null}
        </div>

        <div className="plant-detail__hero-info">
          <h1 className="plant-detail__name">{plant.name}</h1>
          {plant.sci ? <p className="plant-detail__sci">{plant.sci}</p> : null}
          <p className="plant-detail__description">{plant.description}</p>

          <div className="plant-detail__badges">
            <span className="detail-tag">
              <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
                <path d="M12 2c-4 5-7 9.5-7 13a7 7 0 0 0 14 0c0-3.5-3-8-7-13z" />
              </svg>
              {plant.watering}
            </span>
            <span className="detail-tag detail-tag--sun">
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="4" fill="currentColor" stroke="none" />
                <line x1="12" y1="2" x2="12" y2="5" />
                <line x1="12" y1="19" x2="12" y2="22" />
                <line x1="2" y1="12" x2="5" y2="12" />
                <line x1="19" y1="12" x2="22" y2="12" />
                <line x1="4.9" y1="4.9" x2="7" y2="7" />
                <line x1="17" y1="17" x2="19.1" y2="19.1" />
                <line x1="4.9" y1="19.1" x2="7" y2="17" />
                <line x1="17" y1="7" x2="19.1" y2="4.9" />
              </svg>
              {plant.sunlight}
            </span>
          </div>

          <button
            type="button"
            className="plant-detail__add-button"
            onClick={handleAddToShelf}
            disabled={alreadyInShelf}
          >
            {alreadyInShelf ? "✓ In Your Shelf" : "ADD TO MY SHELF"}
          </button>
        </div>
      </div>

      <div className="plant-detail__grid">
        <div className="plant-detail__card">
          <h2 className="plant-detail__card-title">Complete Care Guide</h2>
          <dl className="plant-detail__spec-list">
            {CARE_GUIDE_LABELS.map(([key, label]) => (
              <div className="plant-detail__spec-row" key={key}>
                <dt>{label}</dt>
                <dd>{plant.careGuide[key]}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="plant-detail__card">
          <h2 className="plant-detail__card-title">Tips &amp; Notes</h2>
          <ul className="plant-detail__tips">
            {plant.tips.map((tip) => (
              <li key={tip}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {relatedPlants.length > 0 && (
        <div className="plant-detail__related">
          <h2 className="plant-detail__related-title">Related Plants</h2>
          <PlantList plants={relatedPlants} />
        </div>
      )}

      {toastMessage && (
        <Toast
          message={toastMessage}
          actionLabel="View Shelf"
          actionTo="/profile"
          onDismiss={() => setToastMessage(null)}
        />
      )}
    </section>
  );
}

export default PlantDetailPage;
