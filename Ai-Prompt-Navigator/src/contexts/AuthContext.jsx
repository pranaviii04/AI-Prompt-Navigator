import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // No async check for now

  const login = async (email, password) => {
    setIsLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email && password) {
          setUser({ email });
          setIsLoading(false);
          resolve({ success: true, user: { email } });
        } else {
          setIsLoading(false);
          resolve({ success: false, error: 'Invalid credentials' });
        }
      }, 700);
    });
  };

  const logout = () => {
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
