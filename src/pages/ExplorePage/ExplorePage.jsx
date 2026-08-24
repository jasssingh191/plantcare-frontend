import { useState } from "react";
import PlantList from "../../components/PlantList/PlantList";
import { fetchRegionalPlants, searchPlants } from "../../utils/plantApi";
import { DIRECTORY_PLANTS } from "../../utils/mockPlants";
import { useAsyncData } from "../../hooks/useAsyncData";
import "./ExplorePage.css";

const EXPLORE_PLANT_LIMIT = 12;

function ExplorePage() {
  const [query, setQuery] = useState("");
  const { data: plants, isLoading, run } = useAsyncData(
    fetchRegionalPlants,
    () => DIRECTORY_PLANTS,
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    run(
      () => searchPlants(query),
      () => {
        const matches = DIRECTORY_PLANTS.filter((plant) =>
          plant.name.toLowerCase().includes(query.toLowerCase()),
        );
        return matches.length > 0 ? matches : DIRECTORY_PLANTS;
      },
    );
  };

  const allPlants = plants || [];
  const visiblePlants = allPlants.slice(0, EXPLORE_PLANT_LIMIT);
  const showEmptyState = !isLoading && allPlants.length === 0;

  return (
    <section className="explore-page">
      <h1 className="explore-page__title">Explore Plant Directory</h1>
      <p className="explore-page__subtitle">
        Browse our curated collection of indoor and outdoor plants to find your
        next green companion.
      </p>

      <form className="explore-search" onSubmit={handleSubmit}>
        <input
          type="text"
          className="explore-search__input"
          placeholder="Search by plant name, category, or care level..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="explore-search__button">
          SEARCH
        </button>
      </form>

      {isLoading ? (
        <div className="plant-list" aria-busy="true">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="plant-card plant-card--skeleton">
              <div className="plant-card__preview" />
              <div className="plant-card__body">
                <div className="skeleton-line skeleton-line--title" />
                <div className="skeleton-line skeleton-line--subtitle" />
              </div>
            </div>
          ))}
        </div>
      ) : showEmptyState ? (
        <p className="explore-page__status">
          Nothing found or something went wrong.
        </p>
      ) : (
        <PlantList plants={visiblePlants} />
      )}
    </section>
  );
}

export default ExplorePage;