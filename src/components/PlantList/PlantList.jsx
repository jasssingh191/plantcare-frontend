import PlantCard from "../PlantCard/PlantCard";
import "./PlantList.css";

function PlantList({ plants, showRemove = false, onRemove }) {
  return (
    <div className="plant-list">
      {plants.map((plant) => (
        <PlantCard
          key={plant.id}
          {...plant}
          showRemove={showRemove}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}

export default PlantList;
