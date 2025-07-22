// src/routes-simple.jsx
import { createBrowserRouter, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

// Pages and layouts
import MainLayout from "./components/Layout/MainLayout";
import DashboardPage from "./pages/DashboardPage";
import SettingsPage from "./pages/SettingsPage";
import PromptQuestionnairePage from "./pages/PromptQuestionnairePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import BillingSubscription from "./components/UserManagement/BillingSubscription";
import UserProfile from "./components/UserManagement/UserProfile";
import LandingPage from "./pages/LandingPage";
import MyPromptsPage from "./pages/MyPromptsPage";
import SubscriptionPlans from "./pages/SubscriptionPage";

// Protected Route
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

// Public Route
const PublicRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  return !isAuthenticated ? children : <Navigate to="/app/dashboard" replace />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <PublicRoute>
        <RegisterPage />
      </PublicRoute>
    ),
  },
  {
    path: "/app",
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "dashboard", element: <DashboardPage /> },
      { path: "prompt-questionnaire", element: <PromptQuestionnairePage /> },
      { path: "settings", element: <SettingsPage /> },
      { path: "billing", element: <BillingSubscription /> },
      { path: "userprofile", element: <UserProfile /> },
      { path: "my-prompts", element: <MyPromptsPage/>},
      { path: "subsciption-plans", element: <SubscriptionPlans /> },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />, 
  },
]);

export default router;
