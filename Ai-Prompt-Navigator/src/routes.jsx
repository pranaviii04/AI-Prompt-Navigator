import { createBrowserRouter, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import MainLayout from './components/Layout/MainLayout';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PromptLibraryPage from './pages/PromptLibraryPage';
import PromptEditorPage from './pages/PromptEditorPage';
import AnalyticsPage from './pages/AnalyticsPage';
import SettingsPage from './pages/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

// Protected Route Component
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

// Public Route Component (redirect to dashboard if already authenticated)
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

// Create router configuration
const router = createBrowserRouter([
  // Public routes (authentication pages)
  {
    path: '/login',
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
  },
  {
    path: '/register',
    element: (
      <PublicRoute>
        <RegisterPage />
      </PublicRoute>
    ),
  },
  
  // Protected routes (main application)
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: 'prompts',
        element: <div className="p-6"><h1 className="text-2xl font-bold">Browse Prompts</h1><p>Your prompt library will be displayed here.</p></div>,
      },
      {
        path: 'prompt-editor',
        element: <div className="p-6"><h1 className="text-2xl font-bold">Create Prompt</h1><p>Prompt editor will be displayed here.</p></div>,
      },
      {
        path: 'favorites',
        element: <div className="p-6"><h1 className="text-2xl font-bold">Favorites</h1><p>Your favorite prompts will be displayed here.</p></div>,
      },
      {
        path: 'recent',
        element: <div className="p-6"><h1 className="text-2xl font-bold">Recent Activity</h1><p>Your recent prompt activity will be displayed here.</p></div>,
      },
      {
        path: 'analytics',
        element: <div className="p-6"><h1 className="text-2xl font-bold">Analytics</h1><p>Analytics dashboard will be displayed here.</p></div>,
      },
      {
        path: 'performance',
        element: <div className="p-6"><h1 className="text-2xl font-bold">Performance Metrics</h1><p>Detailed performance analytics will be displayed here.</p></div>,
      },
      {
        path: 'top-prompts',
        element: <div className="p-6"><h1 className="text-2xl font-bold">Top Performing Prompts</h1><p>Your best performing prompts will be displayed here.</p></div>,
      },
      {
        path: 'team',
        element: <div className="p-6"><h1 className="text-2xl font-bold">Team Management</h1><p>Manage your team members and permissions here.</p></div>,
      },
      {
        path: 'templates',
        element: <div className="p-6"><h1 className="text-2xl font-bold">Templates</h1><p>Browse and manage prompt templates here.</p></div>,
      },
      {
        path: 'settings',
        element: <div className="p-6"><h1 className="text-2xl font-bold">Settings</h1><p>Application settings will be displayed here.</p></div>,
      },
      {
        path: 'profile',
        element: <div className="p-6"><h1 className="text-2xl font-bold">User Profile</h1><p>Manage your profile settings here.</p></div>,
      },
      
      // Additional routes for footer links
      {
        path: 'features',
        element: <div className="p-6"><h1 className="text-2xl font-bold">Features</h1><p>Explore all the features of AI Prompt Navigator.</p></div>,
      },
      {
        path: 'pricing',
        element: <div className="p-6"><h1 className="text-2xl font-bold">Pricing</h1><p>View our pricing plans and upgrade options.</p></div>,
      },
      {
        path: 'api',
        element: <div className="p-6"><h1 className="text-2xl font-bold">API Documentation</h1><p>Learn how to integrate with our API.</p></div>,
      },
      {
        path: 'help',
        element: <div className="p-6"><h1 className="text-2xl font-bold">Help Center</h1><p>Find answers to frequently asked questions.</p></div>,
      },
      {
        path: 'docs',
        element: <div className="p-6"><h1 className="text-2xl font-bold">Documentation</h1><p>Comprehensive guides and tutorials.</p></div>,
      },
      {
        path: 'privacy',
        element: <div className="p-6"><h1 className="text-2xl font-bold">Privacy Policy</h1><p>Read our privacy policy and data handling practices.</p></div>,
      },
      {
        path: 'terms',
        element: <div className="p-6"><h1 className="text-2xl font-bold">Terms of Service</h1><p>View our terms of service and user agreements.</p></div>,
      },
    ],
  },
  
  // 404 Route
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

export default router;
