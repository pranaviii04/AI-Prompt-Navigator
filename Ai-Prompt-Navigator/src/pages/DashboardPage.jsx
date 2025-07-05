import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  TrendingUp, 
  Users, 
  FileText, 
  Star,
  Clock,
  BarChart3
} from 'lucide-react';

const DashboardPage = () => {
  const [dashboardData, setDashboardData] = useState({
    totalPrompts: 0,
    favoritePrompts: 0,
    recentActivity: 0,
    teamMembers: 0,
    loading: true
  });

  const [recentPrompts, setRecentPrompts] = useState([]);

  useEffect(() => {
    // Simulate API call to fetch dashboard data
    const fetchDashboardData = async () => {
      try {
        // Mock data
        const mockData = {
          totalPrompts: 147,
          favoritePrompts: 23,
          recentActivity: 12,
          teamMembers: 8,
          loading: false
        };

        const mockRecentPrompts = [
          { id: 1, title: 'Customer Support Email Template', category: 'Email', lastUsed: '2 hours ago', performance: 95 },
          { id: 2, title: 'Code Review Checklist', category: 'Development', lastUsed: '4 hours ago', performance: 88 },
          { id: 3, title: 'Marketing Campaign Ideas', category: 'Marketing', lastUsed: '1 day ago', performance: 92 },
          { id: 4, title: 'Technical Documentation', category: 'Documentation', lastUsed: '2 days ago', performance: 85 },
        ];

        setDashboardData(mockData);
        setRecentPrompts(mockRecentPrompts);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
        setDashboardData(prev => ({ ...prev, loading: false }));
      }
    };

    fetchDashboardData();
  }, []);

  const quickActions = [
    {
      title: 'Create New Prompt',
      description: 'Start building your next AI prompt',
      icon: Plus,
      action: '/prompt-editor',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      title: 'Browse Templates',
      description: 'Explore our prompt library',
      icon: FileText,
      action: '/templates',
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      title: 'View Analytics',
      description: 'Check your performance metrics',
      icon: BarChart3,
      action: '/analytics',
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      title: 'Team Management',
      description: 'Manage your team members',
      icon: Users,
      action: '/team',
      color: 'bg-orange-500 hover:bg-orange-600'
    }
  ];

  const statsCards = [
    {
      title: 'Total Prompts',
      value: dashboardData.totalPrompts,
      icon: FileText,
      change: '+12%',
      changeType: 'positive',
      color: 'text-blue-600'
    },
    {
      title: 'Favorites',
      value: dashboardData.favoritePrompts,
      icon: Star,
      change: '+8%',
      changeType: 'positive',
      color: 'text-yellow-600'
    },
    {
      title: 'Recent Activity',
      value: dashboardData.recentActivity,
      icon: Clock,
      change: '-3%',
      changeType: 'negative',
      color: 'text-green-600'
    },
    {
      title: 'Team Members',
      value: dashboardData.teamMembers,
      icon: Users,
      change: '+2',
      changeType: 'positive',
      color: 'text-purple-600'
    }
  ];

  if (dashboardData.loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back, John! 👋</h1>
        <p className="text-blue-100">
          You've created {dashboardData.totalPrompts} prompts and helped your team be more productive.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {quickActions.map((action, index) => (
          <Link
            key={index}
            to={action.action}
            className={`${action.color} text-white rounded-lg p-6 transition-all duration-200 transform hover:scale-105 hover:shadow-lg`}
          >
            <action.icon className="w-8 h-8 mb-3" />
            <h3 className="font-semibold text-lg mb-2">{action.title}</h3>
            <p className="text-sm opacity-90">{action.description}</p>
          </Link>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentPrompts.map((prompt) => (
              <div key={prompt.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 dark:text-white">{prompt.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{prompt.category} • {prompt.lastUsed}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-green-600">{prompt.performance}%</span>
                  <TrendingUp className="w-4 h-4 text-green-600" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
