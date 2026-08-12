import PlantCard from "../PlantCard/PlantCard";
import "./PlantList.css";

function PlantList({ plants }) {
  return (
    <div className="plant-list">
      {plants.map((plant) => (
        <PlantCard key={plant.id} plant={plant} />
      ))}
    </div>
  );
}

export default PlantList;
