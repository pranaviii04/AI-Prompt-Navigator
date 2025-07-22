// src/pages/MyPromptsPage.jsx

import { useEffect, useState } from "react";
import PromptCard from "../components/chats/PromptCard"; // ✅ Adjust path if needed

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

  return (
    <div className=" min-h-screen  dark:from-gray-900 dark:via-slate-900 dark:to-black p-4 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">📚 My Prompts</h1>

        {/* Prompts Display */}
        {filteredPrompts.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No prompts found.</p>
        ) : (
          <ul className="space-y-4">
            {filteredPrompts.map((prompt) => (
              <PromptCard key={prompt.id} {...prompt} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MyPromptsPage;
