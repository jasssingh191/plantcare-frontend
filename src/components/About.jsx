import React from "react";
import "./About.css";

function About() {
  return (
    <section className="about">
      <div className="about__container">
        <h2 className="about__title">About PlantCare</h2>
        <p className="about__description">
          PlantCare helps plant lovers organize, track, and maintain their
          personal indoor jungle. Search our extensive database to find watering
          schedules, sunlight needs, and care instructions tailored for your
          plants.
        </p>
      </div>
    </section>
  );
}

export default About;
