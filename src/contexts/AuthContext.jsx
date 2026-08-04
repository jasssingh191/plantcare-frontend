import React, { createContext, useContext, useState } from "react";
import { loginRequest, registerRequest } from "../utils/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const login = async (credentials) => {
    const { user: loggedInUser, token: authToken } = await loginRequest(credentials);
    setUser(loggedInUser);
    setToken(authToken);
  };

  const register = async (details) => {
    const { user: newUser, token: authToken } = await registerRequest(details);
    setUser(newUser);
    setToken(authToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
