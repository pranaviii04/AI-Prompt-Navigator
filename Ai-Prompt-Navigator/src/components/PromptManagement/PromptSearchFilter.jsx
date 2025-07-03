import React, { useState } from 'react';

const PromptSearchFilter = ({ onSearch, categories }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm, selectedCategory);
  };

  return (
    <div className="p-4 bg-white rounded shadow mb-4">
      <h2 className="text-xl font-semibold mb-4">Search and Filter</h2>
      <input
        type="text"
        className="w-full p-2 border border-gray-300 rounded mb-4"
        placeholder="Search prompts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select
        className="w-full p-2 border border-gray-300 rounded mb-4"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">All Categories</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

export default PromptSearchFilter;