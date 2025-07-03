import React from 'react';

const PromptCard = ({ title, description, tags, onEdit, onDelete, onRun }) => {
  return (
    <div className="bg-white rounded shadow p-4 mb-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-600">{description}</p>
      <div className="flex flex-wrap mt-2">
        {tags.map((tag, index) => (
          <span key={index} className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-4 flex space-x-2">
        <button
          className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
          onClick={onEdit}
        >
          Edit
        </button>
        <button
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          onClick={onDelete}
        >
          Delete
        </button>
        <button
          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
          onClick={onRun}
        >
          Run
        </button>
      </div>
    </div>
  );
};

export default PromptCard;