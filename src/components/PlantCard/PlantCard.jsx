import React from "react";
import "./PlantCard.css";

function PlantCard({ plant }) {
  return (
    <article className="plant-card">
      <img className="plant-card__image" src={plant.image} alt={plant.name} />
      <h3 className="plant-card__name">{plant.name}</h3>
      <p className="plant-card__description">{plant.description}</p>
    </article>
  );
}

export default PlantCard;
