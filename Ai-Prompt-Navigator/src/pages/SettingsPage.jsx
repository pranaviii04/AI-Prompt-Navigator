import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { User, Bell, Shield, Palette, Globe, Info } from 'lucide-react';

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    language: 'en',
    autoSave: true
  });

  const updateSetting = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const { theme, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState('profile');

  const headings = [
    { key: 'profile', label: 'Profile', icon: <User className="w-4 h-4" /> },
    { key: 'notifications', label: 'Notifications', icon: <Bell className="w-4 h-4" /> },
    { key: 'appearance', label: 'Appearance', icon: <Palette className="w-4 h-4" /> },
    { key: 'language', label: 'Language', icon: <Globe className="w-4 h-4" /> },
    { key: 'about', label: 'About', icon: <Info className="w-4 h-4" /> },
  ];

  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      {/* Sidebar */}
      <div className="w-full lg:w-1/4 h-full">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 sticky top-6">
          <nav className="space-y-2">
            {headings.map((item) => (
              <button
                key={item.key}
                className={`w-full flex items-center space-x-3 px-3 py-2 text-left rounded-lg transition-colors duration-150 ${
                  activeSection === item.key
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                onClick={() => setActiveSection(item.key)}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="w-full lg:w-3/4">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 min-h-[400px]">
          {activeSection === 'profile' && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Profile Settings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    defaultValue="John Doe"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    defaultValue="john@example.com"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            </div>
          )}
          {activeSection === 'notifications' && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Notification Preferences
              </h2>
              <div className="space-y-3">
                <label className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Email notifications
                  </span>
                  <input
                    type="checkbox"
                    checked={settings.emailNotifications}
                    onChange={e => updateSetting('emailNotifications', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </label>
                <label className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Push notifications
                  </span>
                  <input
                    type="checkbox"
                    checked={settings.pushNotifications}
                    onChange={e => updateSetting('pushNotifications', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </label>
                <label className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Auto-save prompts
                  </span>
                  <input
                    type="checkbox"
                    checked={settings.autoSave}
                    onChange={e => updateSetting('autoSave', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </label>
              </div>
            </div>
          )}
          {activeSection === 'appearance' && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Appearance
              </h2>
              <label className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Dark mode
                </span>
                <input
                  type="checkbox"
                  checked={theme === 'dark'}
                  onChange={toggleTheme}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </label>
            </div>
          )}
          {activeSection === 'language' && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Language
              </h2>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Language
              </label>
              <select
                value={settings.language}
                onChange={e => updateSetting('language', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </select>
            </div>
          )}
          {activeSection === 'about' && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                About
              </h2>
              <div className="prose dark:prose-invert max-w-none">
                <h3>Terms and Conditions</h3>
                <p>
                  By using this application, you agree to the terms and conditions
                  set forth by the AI Prompt Navigator team. Your data is handled
                  securely and your privacy is respected. For more information,
                  please contact support.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
