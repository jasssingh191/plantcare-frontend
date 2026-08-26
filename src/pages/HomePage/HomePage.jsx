import { useNavigate } from "react-router-dom";
import SearchForm from "../../components/SearchForm/SearchForm";
import PlantList from "../../components/PlantList/PlantList";
import { fetchRegionalPlants, searchPlants } from "../../utils/plantApi";
import { REGION_PLANTS } from "../../utils/mockPlants";
import { useAsyncData } from "../../hooks/useAsyncData";
import "./HomePage.css";

const HOME_PLANT_LIMIT = 6;

function HomePage() {
  const navigate = useNavigate();
  const { data: plants, isLoading, run } = useAsyncData(
    fetchRegionalPlants,
    () => REGION_PLANTS,
  );

  const handleSearch = (query) => {
    run(
      () => searchPlants(query),
      () => {
        const matches = REGION_PLANTS.filter((plant) =>
          plant.name.toLowerCase().includes(query.toLowerCase()),
        );
        return matches.length > 0 ? matches : REGION_PLANTS;
      },
    );
  };

  const allPlants = plants || [];
  const visiblePlants = allPlants.slice(0, HOME_PLANT_LIMIT);
  const hasMore = !isLoading && allPlants.length > HOME_PLANT_LIMIT;
  const showEmptyState = !isLoading && allPlants.length === 0;

  return (
    <div className="home-page">
      <SearchForm onSearch={handleSearch} />

      <section className="region-plants">
        <div className="region-plants__header">
          <h2 className="region-plants__title">Plants in Your Region</h2>
          <p className="region-plants__subtitle">
            Recommended for your climate this season
          </p>
        </div>

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
          <p className="region-plants__status">
            Nothing found or something went wrong.
          </p>
        ) : (
          <>
            <PlantList plants={visiblePlants} />
            {hasMore && (
              <div className="region-plants__view-more">
                <button
                  type="button"
                  className="btn-view-more"
                  onClick={() => navigate("/explore")}
                >
                  View more
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}

export default HomePage;