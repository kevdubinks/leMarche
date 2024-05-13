import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext); 
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Simulation de récupération de l'état de connexion
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;