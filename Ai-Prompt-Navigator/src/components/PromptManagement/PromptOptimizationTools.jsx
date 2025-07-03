import React from 'react';

const PromptOptimizationTools = ({ suggestions }) => {
  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Optimization Suggestions</h2>
      <ul className="space-y-2">
        {suggestions.map((suggestion, index) => (
          <li key={index} className="p-2 border border-gray-300 rounded">
            {suggestion}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PromptOptimizationTools;