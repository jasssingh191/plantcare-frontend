import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage/HomePage";
import ExplorePage from "./pages/ExplorePage/ExplorePage";
import AboutPage from "./pages/AboutPage/AboutPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import PlantDetailPage from "./pages/PlantDetailPage/PlantDetailPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import Preloader from "./components/Preloader/Preloader";

// Login/Register only ever render as modals now. Both are always
// mounted here so AuthContext can toggle whichever one is open.
function AuthModal() {
  const { authModalView, openAuthModal, closeAuthModal } = useAuth();

  return (
    <>
      <LoginPage
        isOpen={authModalView === "login"}
        onClose={closeAuthModal}
        onSuccess={closeAuthModal}
        onSwitchToRegister={() => openAuthModal("register")}
      />
      <RegisterPage
        isOpen={authModalView === "register"}
        onClose={closeAuthModal}
        onSuccess={closeAuthModal}
        onSwitchToLogin={() => openAuthModal("login")}
      />
    </>
  );
}

// Handles direct visits/redirects to /login and /register (e.g. from
// ProtectedRoute, a bookmark, or a typed URL) by opening the shared
// auth modal over the home page instead of rendering a separate page.
function AuthRedirect({ view }) {
  const { openAuthModal } = useAuth();

  useEffect(() => {
    openAuthModal(view);
  }, [view, openAuthModal]);

  return <Navigate to="/" replace />;
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
            <Route path="/login" element={<AuthRedirect view="login" />} />
            <Route path="/register" element={<AuthRedirect view="register" />} />
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
