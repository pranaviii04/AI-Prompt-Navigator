// src/pages/MyPromptsPage.jsx

import { useEffect, useState } from "react";
import { Pencil, Copy } from "lucide-react";

const dummyPrompts = [
  {
    id: 1,
    title: "Marketing Email",
    content: "Write a promotional email for a new tech gadget targeting Gen Z.",
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: "Blog Outline",
    content: "Outline a blog post about AI use in education.",
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    title: "Product Description",
    content: "Describe a new eco-friendly backpack for Amazon listing.",
    createdAt: new Date().toISOString(),
  },
];

const MyPromptsPage = () => {
  const [prompts, setPrompts] = useState(dummyPrompts);
  const [filteredPrompts, setFilteredPrompts] = useState(dummyPrompts);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const filtered = prompts.filter(
      (prompt) =>
        prompt.title?.toLowerCase().includes(search.toLowerCase()) ||
        prompt.content?.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredPrompts(filtered);
  }, [search, prompts]);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied!");
  };

  const handleEdit = (id) => {
    alert(`Edit prompt ID: ${id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0f7ff] to-[#d6edff] dark:from-[#0f172a] dark:to-[#1e293b] p-4 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
          📚 My Prompts
        </h1>

        <input
          type="text"
          placeholder="🔍 Search prompts..."
          className="w-full mb-6 p-3 rounded-lg border border-[#add8f7] bg-white dark:bg-slate-800 text-gray-800 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {filteredPrompts.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">No prompts found.</p>
        ) : (
          <ul className="space-y-4">
            {filteredPrompts.map((prompt) => (
              <li
                key={prompt.id}
                className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md border border-[#b6dbf2] dark:border-slate-700 
                           hover:shadow-lg hover:scale-[1.01] transition-transform duration-300 ease-out cursor-pointer"
              >
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-xl font-bold text-blue-800 dark:text-blue-200 
                                 hover:text-blue-600 dark:hover:text-blue-300 transition-colors">
                    {prompt.title}
                  </h2>
                  <div className="flex space-x-3">
                    <Pencil
                      size={20}
                      onClick={() => handleEdit(prompt.id)}
                      className="text-blue-500 cursor-pointer hover:text-blue-700 hover:scale-110 transition-transform"
                    />
                    <Copy
                      size={20}
                      onClick={() => handleCopy(prompt.content)}
                      className="text-blue-500 cursor-pointer hover:text-blue-700 hover:scale-110 transition-transform"
                    />
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {prompt.content}
                </p>
                <p className="mt-3 text-sm text-gray-400">
                  Created: {new Date(prompt.createdAt).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MyPromptsPage;
