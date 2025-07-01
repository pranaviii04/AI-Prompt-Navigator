import React from 'react';
import { 
  Home, 
  Bookmark, 
  Search, 
  Plus, 
  Clock,
  Brain,
  
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ isOpen }) => {
  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: Search, label: 'Browse Prompts', path: '/prompts' },
    { icon: Plus, label: 'Create Prompt', path: '/new-prompt' },
    { icon: Bookmark, label: 'Favorites', path: '/favorites' },
    { icon: Clock, label: 'Recent', path: '/recent' },
  ];

  

  return (
    <aside 
      className={`fixed left-0 top-0 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 z-40 ${
        isOpen ? 'w-64' : 'w-16'
      }`}
    >
   

        <div className="flex-1 overflow-y-auto">
          {/* Navigation */}
          <nav className="p-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
                        isActive
                          ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`
                    }
                  >
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    {isOpen && <span className="font-medium">{item.label}</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

         

        {/* Bottom Action */}
        {isOpen && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105">
              Upgrade to Pro
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;

