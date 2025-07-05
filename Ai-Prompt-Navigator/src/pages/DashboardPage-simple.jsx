import { Link } from 'react-router-dom';
import { 
  Plus, 
  FileText, 
  Star,
  Clock,
  BarChart3,
  Settings,
  Users
} from 'lucide-react';

const DashboardPage = () => {
  const statsCards = [
    {
      title: 'Total Prompts',
      value: 147,
      icon: FileText,
      change: '+12%',
      changeType: 'positive',
      color: 'text-blue-600'
    },
    {
      title: 'Favorites',
      value: 23,
      icon: Star,
      change: '+8%',
      changeType: 'positive',
      color: 'text-yellow-600'
    },
    {
      title: 'Recent Activity',
      value: 12,
      icon: Clock,
      change: '-3%',
      changeType: 'negative',
      color: 'text-green-600'
    }
  ];

  const quickActions = [
    {
      title: 'Create New Prompt',
      description: 'Start building your next AI prompt',
      icon: Plus,
      path: '/prompt-editor',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      title: 'Browse Prompts',
      description: 'Explore our prompt library',
      icon: FileText,
      path: '/prompts',
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      title: 'Settings',
      description: 'Manage your preferences',
      icon: Settings,
      path: '/settings',
      color: 'bg-purple-500 hover:bg-purple-600'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back, John! 👋</h1>
        <p className="text-blue-100">
          You've created 147 prompts and helped your team be more productive.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statsCards.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg bg-gray-100 dark:bg-gray-700 ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <span className={`text-sm font-medium ${
                stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </span>
              <span className="text-gray-500 text-sm ml-2">from last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickActions.map((action, index) => (
          <Link
            key={index}
            to={action.path}
            className={`${action.color} text-white rounded-lg p-6 transition-all duration-200 transform hover:scale-105 hover:shadow-lg block`}
          >
            <action.icon className="w-8 h-8 mb-3" />
            <h3 className="font-semibold text-lg mb-2">{action.title}</h3>
            <p className="text-sm opacity-90">{action.description}</p>
          </Link>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">Customer Support Email Template</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Email • 2 hours ago</p>
            </div>
            <span className="text-sm font-medium text-green-600">95%</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">Code Review Checklist</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Development • 4 hours ago</p>
            </div>
            <span className="text-sm font-medium text-green-600">88%</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">Marketing Campaign Ideas</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Marketing • 1 day ago</p>
            </div>
            <span className="text-sm font-medium text-green-600">92%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
