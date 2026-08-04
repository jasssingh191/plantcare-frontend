import React from "react";
import SearchForm from "../../components/SearchForm/SearchForm";
import "./HomePage.css";

function HomePage() {
  const handleSearch = (searchTerm) => {
    console.log("Searching for:", searchTerm);
  };

  return (
    <div className="home-page">
      <SearchForm onSearch={handleSearch} />
    </div>
  );
}

export default HomePage;
