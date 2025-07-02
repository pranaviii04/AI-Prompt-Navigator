import React from "react";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import ThemeToggle from "./components/ThemeToggle.jsx";
import Home from "./pages/Home.jsx";
import "./styles/index.css";

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen">
        <header className="flex justify-end p-4">
          <ThemeToggle />
        </header>
        <Home />
      </div>
    </ThemeProvider>
  );
}

export default App;
