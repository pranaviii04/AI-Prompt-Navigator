import React, { useState } from 'react';

const PromptEditor = ({ onSave, onRun }) => {
  const [prompt, setPrompt] = useState('');
  const [optimizationSuggestions, setOptimizationSuggestions] = useState('');

  const handleSave = () => {
    onSave(prompt);
  };

  const handleRun = () => {
    onRun(prompt);
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Prompt Editor</h2>
      <textarea
        className="w-full h-40 p-2 border border-gray-300 rounded mb-4"
        placeholder="Write your prompt here..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <div className="flex space-x-2">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={handleSave}
        >
          Save
        </button>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={handleRun}
        >
          Run
        </button>
      </div>
      {optimizationSuggestions && (
        <div className="mt-4 p-2 bg-yellow-100 border-l-4 border-yellow-500">
          <p className="text-yellow-700">{optimizationSuggestions}</p>
        </div>
      )}
    </div>
  );
};

export default PromptEditor;