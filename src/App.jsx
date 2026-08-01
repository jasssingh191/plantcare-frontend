import React from "react";
import Header from "./components/Header";
import SearchForm from "./components/SearchForm";
import About from "./components/About";
import Footer from "./components/Footer";

function App() {
  const handleSearch = (searchTerm) => {
    console.log("Searching for:", searchTerm);
  };

  return (
    <div
      className="app"
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Header />
      <main className="app__content" style={{ flex: 1 }}>
        <SearchForm onSearch={handleSearch} />
        <About />
      </main>
      <Footer />
    </div>
  );
}

export default App;
