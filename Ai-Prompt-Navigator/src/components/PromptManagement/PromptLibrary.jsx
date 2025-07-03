import React, { useState } from 'react';
import PromptCard from './PromptCard';

const PromptLibrary = ({ prompts }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPrompts = prompts.filter(prompt =>
    prompt.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Prompt Library</h2>
      <input
        type="text"
        className="w-full p-2 border border-gray-300 rounded mb-4"
        placeholder="Search prompts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPrompts.map((prompt, index) => (
          <PromptCard
            key={index}
            title={prompt.title}
            description={prompt.description}
            tags={prompt.tags}
            onEdit={() => console.log('Edit', prompt)}
            onDelete={() => console.log('Delete', prompt)}
            onRun={() => console.log('Run', prompt)}
          />
        ))}
      </div>
    </div>
  );
};

export default PromptLibrary;