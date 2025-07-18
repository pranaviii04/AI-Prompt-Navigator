<<<<<<< HEAD
import { RouterProvider } from 'react-router-dom';
import React from 'react';
import router from './routes-simple.jsx';
import './index.css';
=======
import { RouterProvider } from "react-router-dom";
import React, { useEffect } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { useSettings } from "./contexts/SettingsContext"; // ✅ Import global settings
import router from "./routes-simple.jsx";
import "./index.css";
>>>>>>> 6d5f713ab3fcc2c623f556280483e8074e999317

import { ThemeProvider } from './contexts/ThemeContext'; // ✅ your existing theme
import { AuthProvider } from './contexts/AuthContext';   // ✅ auth provider for context

function App() {
  const { theme, textSize } = useSettings();
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "Dark");
  }, [theme]);

  return (
    <div style={{ fontSize: `${textSize}px` }}>
      <ThemeProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
