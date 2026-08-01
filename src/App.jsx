import React from "react";
import Header from "./components/Header";
import SearchForm from "./components/SearchForm";

function App() {
  const handleSearch = (searchTerm) => {
    console.log("Searching for:", searchTerm);
  };

  return (
    <div className="app">
      <Header />
      <main className="app__content">
        <SearchForm onSearch={handleSearch} />
      </main>
    </div>
  );
}

export default App;
