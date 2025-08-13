import React, { createContext, useContext, useState } from 'react';
// import api from '../utils/api'; // Axios instance

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email, password) => {
    setIsLoading(true);

    try {
      // Simulate delay and success
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Optional: dummy validation
      // if (email !== "test@example.com" || password !== "1234") {
      //   return { success: false, error: "Invalid credentials" };
      // }

      const fakeUser = { email };
      setUser(fakeUser);
      localStorage.setItem("user", JSON.stringify(fakeUser));
      return { success: true, user: fakeUser };
    } catch (err) {
      return { success: false, error: "Login failed" };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    // Just clear user
    setUser(null);
    localStorage.removeItem("user");
    
  };

    //code for backend login
  //   try {
  //     const res = await api.post("/signin", { 
  //       gmail_id: email, 
  //       password });
  //     setUser(res.data.user || { email }); // or store token/res info
  //     return { success: true, user: res.data.user };
  //   } catch (err) {
  //     return { success: false, error: err.response?.data?.message || "Login failed" };
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  // const logout = async () => {
  //   try {
  //     await api.post("/logout"); // Optional
  //   } catch (err) {
  //     console.error("Logout failed", err);
  //   }
  //   setUser(null);
  // };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
