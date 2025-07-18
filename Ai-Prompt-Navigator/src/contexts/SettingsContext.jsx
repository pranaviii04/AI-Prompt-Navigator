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
