import React, { createContext, useContext, useState } from 'react';

const PromptContext = createContext();

export const PromptProvider = ({ children }) => {
  const [prompts, setPrompts] = useState([]);
  const [selectedPrompt, setSelectedPrompt] = useState(null);

  const addPrompt = (prompt) => setPrompts((prev) => [...prev, prompt]);
  const updatePrompt = (id, updatedPrompt) => setPrompts((prev) => prev.map(p => p.id === id ? { ...p, ...updatedPrompt } : p));
  const removePrompt = (id) => setPrompts((prev) => prev.filter(p => p.id !== id));

  return (
    <PromptContext.Provider value={{ prompts, selectedPrompt, setSelectedPrompt, addPrompt, updatePrompt, removePrompt }}>
      {children}
    </PromptContext.Provider>
  );
};

export const usePrompt = () => useContext(PromptContext);
