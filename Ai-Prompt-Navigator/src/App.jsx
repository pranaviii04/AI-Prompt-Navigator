import { RouterProvider } from "react-router-dom";
import React, { useEffect } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { useSettings } from "./contexts/SettingsContext";
import router from "./routes-simple.jsx";
import "./index.css";

function App() {
  const { theme, textSize } = useSettings();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "Dark");
  }, [theme]);

  return (
    <div
      className={`min-h-screen ${
        theme === "Dark" ? "dark bg-gray-950 text-white" : "bg-white text-black"
      }`}
      style={{ fontSize: `${textSize}px` }}
    >
      <ThemeProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
