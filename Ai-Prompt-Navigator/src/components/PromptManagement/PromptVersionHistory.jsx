import React from 'react';

const PromptVersionHistory = ({ versions, onRestore }) => {
  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Version History</h2>
      <ul className="space-y-2">
        {versions.map((version, index) => (
          <li key={index} className="flex justify-between items-center p-2 border-b">
            <span>{version.date}</span>
            <button
              className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
              onClick={() => onRestore(version)}
            >
              Restore
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PromptVersionHistory;