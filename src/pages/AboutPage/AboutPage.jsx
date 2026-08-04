import React from "react";
import "./AboutPage.css";

function AboutPage() {
  return (
    <section className="about-page">
      <div className="about-page__container">
        <h2 className="about-page__title">About PlantCare</h2>
        <p className="about-page__description">
          PlantCare helps plant lovers organize, track, and maintain their
          personal indoor jungle. Search our extensive database to find watering
          schedules, sunlight needs, and care instructions tailored for your
          plants.
        </p>
      </div>
    </section>
  );
}

export default AboutPage;
