import { useState } from "react";
import "./SearchForm.css";

function SearchForm({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <div className="hero">
      <h1 className="hero__title">Find the right care for every plant</h1>
      <p className="hero__subtitle">
        Search by name, or browse what grows best where you live.
      </p>

      <form className="search-bar" onSubmit={handleSubmit}>
        <input
          type="text"
          className="search-bar__input"
          placeholder="Search for a plant (e.g. Monstera, Fern)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="search-bar__button">
          SEARCH
        </button>
      </form>
    </div>
  );
}

export default SearchForm;
