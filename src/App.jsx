import { Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Modal from "./components/Modal/Modal";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage/HomePage";
import ExplorePage from "./pages/ExplorePage/ExplorePage";
import AboutPage from "./pages/AboutPage/AboutPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import PlantDetailPage from "./pages/PlantDetailPage/PlantDetailPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import Preloader from "./components/Preloader/Preloader";

function AuthModal() {
  const { authModalView, openAuthModal, closeAuthModal } = useAuth();

  return (
    <Modal isOpen={authModalView !== null} onClose={closeAuthModal}>
      {authModalView === "login" ? (
        <LoginPage
          onSuccess={closeAuthModal}
          onSwitchToRegister={() => openAuthModal("register")}
        />
      ) : null}
      {authModalView === "register" ? (
        <RegisterPage
          onSuccess={closeAuthModal}
          onSwitchToLogin={() => openAuthModal("login")}
        />
      ) : null}
    </Modal>
  );
}

function App() {
  return (
    <AuthProvider>
      <div
        className="app"
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Navbar />
        <main className="app__content" style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/plant/:id" element={<PlantDetailPage />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            {/* Temporary — for manually previewing <Preloader />. Remove before Stage 1.2. */}
            <Route path="/_preloader-preview" element={<Preloader />} />
          </Routes>
        </main>
        <Footer />

        <AuthModal />
      </div>
    </AuthProvider>
  );
}

export default App;
