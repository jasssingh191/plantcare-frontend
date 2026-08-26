import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

function nameFromEmail(email) {
  const local = email.split("@")[0] || "there";
  return local
    .replace(/[._-]+/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userShelf, setUserShelf] = useState([]);
  const [authModalView, setAuthModalView] = useState(null);

  // No backend yet — mock a session locally (any credentials work) so
  // the rest of the auth-gated UI (profile, shelf, etc.) can actually
  // be exercised end to end. See utils/auth.js for the real API shape
  // to swap this for once a backend exists.
  const login = async ({ email }) => {
    setUser({ name: nameFromEmail(email), email });
  };

  const register = async ({ name, email }) => {
    setUser({ name: name || nameFromEmail(email), email });
  };

  const logout = () => {
    setUser(null);
    setUserShelf([]);
  };

  // Plant ids can arrive as either numbers (from the Perenual API) or
  // strings (from useParams()), so compare them as strings throughout.
  const addToShelf = (plant) => {
    setUserShelf((prev) =>
      prev.some((item) => String(item.id) === String(plant.id))
        ? prev
        : [...prev, plant]
    );
  };

  const removeFromShelf = (plantId) => {
    setUserShelf((prev) => prev.filter((item) => String(item.id) !== String(plantId)));
  };

  const isInShelf = (plantId) =>
    userShelf.some((item) => String(item.id) === String(plantId));

  const openAuthModal = (view = "login") => setAuthModalView(view);
  const closeAuthModal = () => setAuthModalView(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        userShelf,
        login,
        register,
        logout,
        addToShelf,
        removeFromShelf,
        isInShelf,
        authModalView,
        openAuthModal,
        closeAuthModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
