import React, { createContext, useContext, useState } from 'react';

const AIModelContext = createContext();

const defaultModels = [
  { id: 'gemini', name: 'Gemini Pro', icon: '🤖' },
  { id: 'chatgpt', name: 'ChatGPT-4', icon: '🧠' },
  { id: 'deepseek', name: 'DeepSeek', icon: '🔍' }
];

export const AIModelProvider = ({ children }) => {
  const [selectedModel, setSelectedModel] = useState(defaultModels[0].id);
  const [availableModels, setAvailableModels] = useState(defaultModels);

  return (
    <AIModelContext.Provider value={{ selectedModel, setSelectedModel, availableModels, setAvailableModels }}>
      {children}
    </AIModelContext.Provider>
  );
};

export const useAIModel = () => useContext(AIModelContext);
