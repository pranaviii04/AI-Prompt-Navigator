import React, { createContext, useContext, useState } from 'react';
import api from '../utils/api'; // Axios instance

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const res = await api.post("/signin", { 
        gmail_id: email, 
        password });
      setUser(res.data.user || { email }); // or store token/res info
      return { success: true, user: res.data.user };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || "Login failed" };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await api.post("/logout"); // Optional
    } catch (err) {
      console.error("Logout failed", err);
    }
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
