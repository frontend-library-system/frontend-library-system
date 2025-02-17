// src/context/AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store user details
  const [loading, setLoading] = useState(false);

  const login = (username, password) => {
    setLoading(true);
    // Simulate an API call for login
    setTimeout(() => {
      if (username === 'admin' && password === 'password') {
        setUser({ name: 'Admin', role: 'admin' });
      } else {
        alert('Invalid username or password');
      }
      setLoading(false);
    }, 1000);
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
