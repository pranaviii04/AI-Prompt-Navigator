import { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Activity, Clock } from 'lucide-react';

const UserDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalSessions: 156,
    averageSessionTime: '12m 34s',
    promptsCreated: 47,
    successRate: 92,
    weeklyData: [],
    loading: true
  });

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      try {
        const mockWeeklyData = [
          { day: 'Mon', prompts: 12, usage: 45 },
          { day: 'Tue', prompts: 15, usage: 38 },
          { day: 'Wed', prompts: 8, usage: 52 },
          { day: 'Thu', prompts: 18, usage: 41 },
          { day: 'Fri', prompts: 22, usage: 67 },
          { day: 'Sat', prompts: 5, usage: 23 },
          { day: 'Sun', prompts: 7, usage: 31 }
        ];

        setDashboardData(prev => ({
          ...prev,
          weeklyData: mockWeeklyData,
          loading: false
        }));
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
        setDashboardData(prev => ({ ...prev, loading: false }));
      }
    };

    fetchData();
  }, []);

  const metrics = [
    {
      title: 'Total Sessions',
      value: dashboardData.totalSessions,
      icon: Activity,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20'
    },
    {
      title: 'Avg Session Time',
      value: dashboardData.averageSessionTime,
      icon: Clock,
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900/20'
    },
    {
      title: 'Prompts Created',
      value: dashboardData.promptsCreated,
      icon: BarChart3,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20'
    },
    {
      title: 'Success Rate',
      value: `${dashboardData.successRate}%`,
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100 dark:bg-orange-900/20'
    }
  ];

  if (dashboardData.loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-300 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            <div className="h-3 bg-gray-300 rounded"></div>
            <div className="h-3 bg-gray-300 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">User Dashboard</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Your activity overview</p>
      </div>
      
      <div className="p-6">
        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {metrics.map((metric, index) => (
            <div key={index} className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    {metric.title}
                  </p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white mt-1">
                    {metric.value}
                  </p>
                </div>
                <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                  <metric.icon className={`w-4 h-4 ${metric.color}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Weekly Activity Chart */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Weekly Activity</h3>
          <div className="space-y-2">
            {dashboardData.weeklyData.map((day, index) => (
              <div key={index} className="flex items-center space-x-3">
                <span className="text-xs font-medium text-gray-600 dark:text-gray-400 w-8">
                  {day.day}
                </span>
                <div className="flex-1 flex space-x-2">
                  <div className="flex-1">
                    <div className="bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div 
                        className="bg-blue-500 rounded-full h-2 transition-all duration-300"
                        style={{ width: `${(day.prompts / 25) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className="text-xs text-gray-600 dark:text-gray-400 w-8">
                    {day.prompts}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
            <span>Prompts Created This Week</span>
            <span>Peak: Friday (22)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
