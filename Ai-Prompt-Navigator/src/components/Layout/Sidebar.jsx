import { Home, MessageSquare, BookOpen, CreditCard, Star } from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ isOpen }) => {
  const navItems = [
    { icon: Home, label: "Dashboard", path: "/app/dashboard" },
    {
      icon: MessageSquare,
      label: "Generate Prompt",
      path: "/app/prompt-questionnaire",
    },
    { icon: BookOpen, label: "My Prompts", path: "/app/my-prompts" },
    {
      icon: CreditCard,
      label: "Subscription Plans",
      path: "/app/subsciption-plans",
    },
  ];

  const renderNavItems = (items) => (
    <ul className="space-y-1">
      {items.map((item) => (
        <li key={item.path}>
          <NavLink
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors duration-200 group ${
                isActive
                  ? "bg-[#eaf3ff] text-[#2563eb] font-medium" // Active - light blue
                  : "text-gray-600 hover:bg-[#f5f9ff] hover:text-[#1e3a8a]" // <-- Much lighter hover blue
              } dark:${
                isActive
                  ? "bg-blue-900/20 text-white-200"
                  : "text-gray-600 hover:bg-gray-400"
              }`
            }
            title={!isOpen ? item.label : ""}
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
  );

  return (
    <aside
      className={`bg-[#f9fbff] dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 z-30
        ${isOpen ? "w-64" : "w-16"} h-[calc(100vh-64px)] fixed top-16 left-0 overflow-y-auto`}
    >
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto">
          <nav className="p-4">{renderNavItems(navItems)}</nav>
        </div>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          {isOpen ? (
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg p-4 text-white">
              <h4 className="font-semibold text-sm mb-1">Upgrade to Pro</h4>
              <p className="text-xs opacity-90 mb-3">
                Unlock advanced features and unlimited prompts
              </p>
              <NavLink to="/billing">
                <button className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-200">
                  Upgrade Now
                </button>
              </NavLink>
            </div>
          ) : (
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <Star className="w-4 h-4 text-white" />
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
