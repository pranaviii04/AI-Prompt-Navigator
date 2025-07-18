<<<<<<< HEAD
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import MainLayout from './components/Layout/MainLayout';
import MainDemoPage from './pages/MainDemoPage';
import DashboardPage from './pages/DashboardPage';
import PromptLibraryPage from './pages/PromptLibraryPage';
import PromptEditorPage from './pages/PromptEditorPage';
import SettingsPage from './pages/SettingsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';

// ✅ Protected Route Component
=======
import { createBrowserRouter, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import MainLayout from "./components/Layout/MainLayout";
import MainDemoPage from "./pages/MainDemoPage";
import DashboardPage from "./pages/DashboardPage";
import PromptLibraryPage from "./pages/PromptLibraryPage";
import PromptEditorPage from "./pages/PromptEditorPage";
import SettingsPage from "./pages/SettingsPage";
import AnalyticsPage from "./pages/AnalyticsPage";

import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";

import Header from "./components/Layout/Header";
import Sidebar from "./components/Layout/Sidebar";
import BillingSubscription from "./components/UserManagement/BillingSubscription";
import UserProfile from "./components/UserManagement/UserProfile";
// Protected Route Component
>>>>>>> 6d5f713ab3fcc2c623f556280483e8074e999317
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// ✅ Public Route Component
const PublicRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return !isAuthenticated ? children : <Navigate to="/" replace />;
};

// ✅ Create router configuration — FIXED!
const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
  },
<<<<<<< HEAD
  {
    path: '/register',
    element: (
      <PublicRoute>
        <RegisterPage />
      </PublicRoute>
    ),
  },
=======

  // Protected routes (main application)
>>>>>>> 6d5f713ab3fcc2c623f556280483e8074e999317
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <MainDemoPage />,
      },
      {
<<<<<<< HEAD
        path: 'dashboard',
        element: <DashboardPage />,
=======
        path: "dashboard",
        element: <DashboardPage />, // Analytics dashboard
>>>>>>> 6d5f713ab3fcc2c623f556280483e8074e999317
      },
      {
        path: "prompts",
        element: <PromptLibraryPage />,
      },
      {
        path: "prompt-editor",
        element: <PromptEditorPage />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
      },
      {
        path: "analytics",
        element: <AnalyticsPage />,
      },
      {
        path: "billing",
        element: <BillingSubscription />,
      },
      {
        path: "userprofile",
        element: <UserProfile />,
      },
    ],
  },
<<<<<<< HEAD
=======

  // 404 Route
>>>>>>> 6d5f713ab3fcc2c623f556280483e8074e999317
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
