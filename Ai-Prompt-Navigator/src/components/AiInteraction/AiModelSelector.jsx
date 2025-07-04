import React from 'react';
import Dropdown from '../Common/Dropdown';

const AIModelSelector = ({ selectedModel, onModelChange, availableModels = [] }) => {
  const modelOptions = [
    { value: 'gemini', label: 'Gemini Pro', icon: '🤖' },
    { value: 'chatgpt', label: 'ChatGPT-4', icon: '🧠' },
    { value: 'deepseek', label: 'DeepSeek', icon: '🔍' },
    ...availableModels.map(model => ({
      value: model.id,
      label: model.name,
      icon: model.icon || '⚙️'
    }))
  ];

  const selectedOption = modelOptions.find(option => option.value === selectedModel) || modelOptions[0];

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium text-gray-700">AI Model</h3>
        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
          {selectedOption?.icon} {selectedOption?.label}
        </span>
      </div>
      
      <Dropdown
        options={modelOptions}
        value={selectedModel}
        onChange={onModelChange}
        renderOption={(option) => (
          <div className="flex items-center">
            <span className="mr-2">{option.icon}</span>
            <span>{option.label}</span>
          </div>
        )}
        className="w-full"
      />
      
      <div className="mt-3 text-xs text-gray-500">
        {selectedModel === 'gemini' && (
          <p>Gemini Pro excels at creative tasks and multi-turn conversations.</p>
        )}
        {selectedModel === 'chatgpt' && (
          <p>ChatGPT-4 provides detailed, nuanced responses with strong reasoning.</p>
        )}
        {selectedModel === 'deepseek' && (
          <p>DeepSeek is optimized for technical and research-oriented queries.</p>
        )}
      </div>
      
      <div className="mt-2 flex justify-between text-xs text-gray-500">
        <span>Cost: {getModelCost(selectedModel)}/request</span>
        <span>Max tokens: {getModelMaxTokens(selectedModel)}</span>
      </div>
    </div>
  );
};

// Helper functions
function getModelCost(model) {
  const costs = {
    gemini: '$0.0005',
    chatgpt: '$0.002',
    deepseek: '$0.0003'
  };
  return costs[model] || '$0.001';
}

function getModelMaxTokens(model) {
  const tokens = {
    gemini: '8192',
    chatgpt: '4096',
    deepseek: '16384'
  };
  return tokens[model] || '2048';
}

export default AIModelSelector;