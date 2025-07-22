// src/contexts/SettingsContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [theme, setTheme] = useState("System");
  const [textSize, setTextSize] = useState(16);
  const [language, setLanguage] = useState("Auto-detect");
  const [spokenLanguage, setSpokenLanguage] = useState("Auto-detect");

  // Optional: Persist to localStorage
  useEffect(() => {
    const stored = localStorage.getItem("appSettings");
    if (stored) {
      const s = JSON.parse(stored);
      setTheme(s.theme);
      setTextSize(s.textSize);
      setLanguage(s.language);
      setSpokenLanguage(s.spokenLanguage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "appSettings",
      JSON.stringify({ theme, textSize, language, spokenLanguage })
    );
  }, [theme, textSize, language, spokenLanguage]);

   // Apply Tailwind dark mode class to <html>
  useEffect(() => {
    const root = document.documentElement;

    if (theme === "Dark") {
      root.classList.add("dark");
    } else if (theme === "Light") {
      root.classList.remove("dark");
    } else {
      // System theme
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.classList.toggle("dark", isDark);

      const media = window.matchMedia("(prefers-color-scheme: dark)");
      const handler = (e) => root.classList.toggle("dark", e.matches);
      media.addEventListener("change", handler);

      return () => media.removeEventListener("change", handler);
    }
  }, [theme]);

  return (
    <SettingsContext.Provider
      value={{
        theme,
        setTheme,
        textSize,
        setTextSize,
        language,
        setLanguage,
        spokenLanguage,
        setSpokenLanguage,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

// Custom hook
export const useSettings = () => useContext(SettingsContext);
