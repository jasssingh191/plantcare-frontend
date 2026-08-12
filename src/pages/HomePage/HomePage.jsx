import SearchForm from "../../components/SearchForm/SearchForm";
import PlantList from "../../components/PlantList/PlantList";
import { REGION_PLANTS } from "../../utils/mockPlants";
import "./HomePage.css";

function HomePage() {
  const handleSearch = (searchTerm) => {
    console.log("Searching for:", searchTerm);
  };

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
        <PlantList plants={REGION_PLANTS} />
      </section>
    </div>
  );
}

export default HomePage;
