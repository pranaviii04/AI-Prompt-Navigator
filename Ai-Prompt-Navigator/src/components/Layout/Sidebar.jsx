import { 
  Home, 
  Bookmark, 
  Search, 
  Plus, 
  Clock,
  BarChart3,
  Settings,
  Users,
  FileText,
  Star,
  TrendingUp
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ isOpen }) => {
  const navItems = [
    { icon: Home, label: 'Main Demo', path: '/', section: 'main' },
    { icon: BarChart3, label: 'Dashboard', path: '/dashboard', section: 'main' },
    { icon: Search, label: 'Browse Prompts', path: '/prompts', section: 'main' },
    { icon: Plus, label: 'Create Prompt', path: '/prompt-editor', section: 'main' },
    { icon: TrendingUp, label: 'Analytics', path: '/analytics', section: 'main' },
  ];

  const settingsItems = [
    { icon: Settings, label: 'Settings', path: '/settings', section: 'settings' },
  ];

  const renderNavSection = (items, title) => (
    <div className="mb-6">
      {isOpen && (
        <h3 className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
          {title}
        </h3>
      )}
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors duration-200 group ${
                  isActive
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`
              }
              title={!isOpen ? item.label : ''}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {isOpen && (
                <span className="font-medium truncate">{item.label}</span>
              )}
              {!isOpen && (
                <span className="absolute left-12 bg-gray-900 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                  {item.label}
                </span>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden" />
      )}
      
      <aside 
        className={`fixed left-0 top-0 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 z-40 ${
          isOpen ? 'w-64' : 'w-16'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo/Brand Section */}
          <div className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5 text-white" />
            </div>
            {isOpen && (
              <div className="ml-3">
                <h2 className="font-bold text-lg text-gray-900 dark:text-white">
                  AI Navigator
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Prompt Management
                </p>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto">          <nav className="p-4">
            {renderNavSection(navItems, 'Navigation')}
            {renderNavSection(settingsItems, 'Settings')}
          </nav>
          </div>

          {/* Bottom Section - Upgrade Button */}
          {isOpen && (
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-4 text-white">
                <h4 className="font-semibold text-sm mb-1">Upgrade to Pro</h4>
                <p className="text-xs opacity-90 mb-3">
                  Unlock advanced features and unlimited prompts
                </p>
                <button className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-200">
                  Upgrade Now
                </button>
              </div>
            </div>
          )}

          {/* Collapse indicator for closed state */}
          {!isOpen && (
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Star className="w-4 h-4 text-white" />
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
