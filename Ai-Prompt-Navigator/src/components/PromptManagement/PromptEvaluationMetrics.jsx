import React from 'react';
import { Bar } from 'react-chartjs-2';

const PromptEvaluationMetrics = ({ metrics }) => {
  const data = {
    labels: metrics.map(metric => metric.label),
    datasets: [
      {
        label: 'Performance Metrics',
        data: metrics.map(metric => metric.value),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Performance Metrics</h2>
      <Bar data={data} />
    </div>
  );
};

export default PromptEvaluationMetrics;