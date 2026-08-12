import { useState } from "react";
import PlantList from "../../components/PlantList/PlantList";
import { DIRECTORY_PLANTS } from "../../utils/mockPlants";
import "./ExplorePage.css";

function ExplorePage() {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Searching directory for:", query);
  };

  return (
    <section className="explore-page">
      <h1 className="explore-page__title">Explore Plant Directory</h1>
      <p className="explore-page__subtitle">
        Browse our curated collection of indoor and outdoor plants to find
        your next green companion.
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

      <PlantList plants={DIRECTORY_PLANTS} />
    </section>
  );
}

export default ExplorePage;
