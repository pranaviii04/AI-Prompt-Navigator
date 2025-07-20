import React from "react";
import { useSettings } from "../../contexts/SettingsContext";

const Home = () => {
  const { textSize, theme } = useSettings();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Home Page</h1>
      <div style={{ fontSize: textSize }}>
        🌍 Global Settings Applied Here:
        <p className="mt-2">
          <strong>Theme:</strong> {theme}
        </p>
        <p>
          <strong>Text Size:</strong> {textSize}px
        </p>
      </div>
    </div>
  );
};

export default Home;
