import { RouterProvider } from 'react-router-dom';
import React from 'react';
import router from './routes-simple.jsx';
import './index.css';

import { ThemeProvider } from './contexts/ThemeContext'; // ✅ your existing theme
import { AuthProvider } from './contexts/AuthContext';   // ✅ auth provider for context

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
