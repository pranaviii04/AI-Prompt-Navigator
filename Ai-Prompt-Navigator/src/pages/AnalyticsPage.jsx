import { BarChart3, TrendingUp, Users, Target } from 'lucide-react';

const AnalyticsPage = () => {
  const metrics = [
    { title: 'Response Time', value: '1.2s', icon: BarChart3, color: 'text-blue-600' },
    { title: 'Success Rate', value: '94.5%', icon: Target, color: 'text-green-600' },
    { title: 'User Satisfaction', value: '4.7/5', icon: TrendingUp, color: 'text-purple-600' },
    { title: 'Active Users', value: '156', icon: Users, color: 'text-orange-600' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h1>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
          Export Report
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">{metric.title}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{metric.value}</p>
              </div>
              <div className={`p-3 rounded-lg bg-gray-100 dark:bg-gray-700 ${metric.color}`}>
                <metric.icon className="w-6 h-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chart Placeholder */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Performance Over Time</h2>
        <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400">Chart visualization will be here</p>
        </div>
      </div>

      {/* Usage Statistics */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Usage Statistics</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-400">Most Used Prompt Type</span>
            <span className="font-medium text-gray-900 dark:text-white">Email Templates</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-400">Peak Usage Time</span>
            <span className="font-medium text-gray-900 dark:text-white">2:00 PM - 4:00 PM</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-400">Average Session Duration</span>
            <span className="font-medium text-gray-900 dark:text-white">12 minutes</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
