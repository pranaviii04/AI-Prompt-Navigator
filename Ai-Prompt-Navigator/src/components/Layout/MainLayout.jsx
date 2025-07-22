import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (window.innerWidth < 1024) {
        setSidebarOpen(!mobile);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close sidebar on mobile when route changes
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [location.pathname, isMobile]);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  // Get page title based on current route
  const getPageTitle = () => {
    const path = location.pathname;
    const titles = {
      '/dashboard': 'Analytics Dashboard',
      '/prompt-questionnaire': 'Generate Prompt',
      '/my-prompts': 'My Prompts',
      '/billing': 'Billing & Subscription',
      '/settings': 'Settings',
      '/userprofile': 'User Profile',
      '/subsciption-plans': 'Subscription Plans',
    };
    return titles[path] || 'PromptCraft AI';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} />

      {/* Overlay for mobile */}
      {sidebarOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isMobile ? 'ml-0' : sidebarOpen ? 'ml-64' : 'ml-16'
        }`}
      >
        {/* Header */}
        <Header
          title={getPageTitle()}
          onToggleSidebar={toggleSidebar}
          sidebarOpen={sidebarOpen}
        />

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            <Outlet />
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
