import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // 👈 asegúrate que sea "jwtDecode" con llaves

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // 👈 nombre uniforme: "user"

  useEffect(() => {
    const token = localStorage.getItem('access');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (error) {
        console.error('Error al decodificar token:', error);
        setUser(null);
      }
    }
  }, []);

  const login = (token) => {
    const decoded = jwtDecode(token);
    setUser(decoded);
  };

  const logout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
