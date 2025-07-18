import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AIModelProvider } from "./contexts/AIModelContext";
import { PromptProvider } from "./contexts/PromptContext";
import { SettingsProvider } from "./contexts/SettingsContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <AIModelProvider>
          <PromptProvider>
            <SettingsProvider>
              <App />
            </SettingsProvider>
          </PromptProvider>
        </AIModelProvider>
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);
