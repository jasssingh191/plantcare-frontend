import "./AboutPage.css";

function AboutPage() {
  return (
    <section className="about-page">
      <div className="about-page__card">
        <h2 className="about-page__title">About PlantCare</h2>
        <p className="about-page__text">
          PlantCare helps people keep their plants alive and thriving by
          pairing every species with clear, personalized care guidance — how
          often to water, how much light it needs, and what to watch for as
          the seasons change.
        </p>

        <h3 className="about-page__heading">Our care philosophy</h3>
        <p className="about-page__text">
          Plants fail most often from good intentions applied at the wrong
          time. We favor simple, consistent routines over rigid schedules,
          and we adapt every recommendation to your local climate rather
          than a generic global average.
        </p>

        <h3 className="about-page__heading">How to use PlantCare</h3>
        <ol className="about-page__list">
          <li>Search for a plant you own or want to grow.</li>
          <li>Browse "Plants in Your Region" for climate-matched suggestions.</li>
          <li>Check each plant's watering and sunlight tags before you buy or repot.</li>
        </ol>
      </div>
    </section>
  );
}

export default AboutPage;
