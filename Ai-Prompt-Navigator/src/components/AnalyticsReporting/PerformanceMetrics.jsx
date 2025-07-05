import { useState, useEffect } from 'react';
import { TrendingUp, Zap, Target, Clock } from 'lucide-react';

const PerformanceMetrics = () => {
  const [metricsData, setMetricsData] = useState({
    responseTime: '1.2s',
    accuracy: 94.5,
    efficiency: 87.2,
    userSatisfaction: 4.7,
    trends: [],
    loading: true
  });

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const mockTrends = [
          { metric: 'Response Time', current: 1.2, previous: 1.5, change: -20 },
          { metric: 'Accuracy', current: 94.5, previous: 91.8, change: 2.9 },
          { metric: 'Efficiency', current: 87.2, previous: 84.1, change: 3.7 },
          { metric: 'Satisfaction', current: 4.7, previous: 4.4, change: 6.8 }
        ];

        setMetricsData(prev => ({
          ...prev,
          trends: mockTrends,
          loading: false
        }));
      } catch (error) {
        console.error('Failed to fetch performance metrics:', error);
        setMetricsData(prev => ({ ...prev, loading: false }));
      }
    };

    fetchMetrics();
  }, []);

  const performanceCards = [
    {
      title: 'Response Time',
      value: metricsData.responseTime,
      icon: Clock,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20',
      trend: -12.5,
      description: 'Average prompt processing time'
    },
    {
      title: 'Accuracy Score',
      value: `${metricsData.accuracy}%`,
      icon: Target,
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900/20',
      trend: 3.2,
      description: 'Prompt effectiveness rating'
    },
    {
      title: 'Efficiency',
      value: `${metricsData.efficiency}%`,
      icon: Zap,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/20',
      trend: 5.8,
      description: 'Resource utilization rate'
    },
    {
      title: 'User Rating',
      value: metricsData.userSatisfaction,
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20',
      trend: 8.4,
      description: 'Average user satisfaction'
    }
  ];

  if (metricsData.loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="h-20 bg-gray-300 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Performance Metrics</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Real-time system performance</p>
      </div>
      
      <div className="p-6">
        {/* Performance Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {performanceCards.map((card, index) => (
            <div key={index} className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-lg ${card.bgColor}`}>
                  <card.icon className={`w-4 h-4 ${card.color}`} />
                </div>
                <div className={`text-xs font-medium ${
                  card.trend >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {card.trend >= 0 ? '+' : ''}{card.trend}%
                </div>
              </div>
              <div>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {card.value}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {card.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Performance Trends */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Trend Analysis</h3>
          <div className="space-y-3">
            {metricsData.trends.map((trend, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    trend.change >= 0 ? 'bg-green-500' : 'bg-red-500'
                  }`}></div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {trend.metric}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {trend.current}{trend.metric === 'Response Time' ? 's' : trend.metric === 'Satisfaction' ? '' : '%'}
                  </span>
                  <span className={`text-xs font-medium ${
                    trend.change >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {trend.change >= 0 ? '+' : ''}{trend.change}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Summary */}
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <span className="font-medium text-gray-900 dark:text-white">System Health: Excellent</span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            All metrics are performing above baseline. Response times improved by 12.5% this week.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMetrics;
