import React, { useState } from 'react';
import Button from '../Common/Button';
import Input from '../Common/Input';

const ContextManager = ({ initialContexts = [], onContextsChange }) => {
  const [contexts, setContexts] = useState(initialContexts);
  const [newContext, setNewContext] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  const handleAddContext = () => {
    if (newContext.trim()) {
      const updatedContexts = [
        ...contexts,
        {
          id: Date.now(),
          text: newContext.trim(),
          timestamp: new Date().toISOString()
        }
      ];
      setContexts(updatedContexts);
      onContextsChange(updatedContexts);
      setNewContext('');
    }
  };

  const handleEditStart = (context) => {
    setEditingId(context.id);
    setEditText(context.text);
  };

  const handleEditSave = (id) => {
    const updatedContexts = contexts.map(context =>
      context.id === id ? { ...context, text: editText } : context
    );
    setContexts(updatedContexts);
    onContextsChange(updatedContexts);
    setEditingId(null);
  };

  const handleRemoveContext = (id) => {
    const updatedContexts = contexts.filter(context => context.id !== id);
    setContexts(updatedContexts);
    onContextsChange(updatedContexts);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Context Manager</h3>
        <p className="text-sm text-gray-500">
          Add contextual information to guide the AI's responses
        </p>
      </div>
      
      <div className="p-4">
        <div className="flex space-x-2 mb-4">
          <Input
            type="text"
            value={newContext}
            onChange={(e) => setNewContext(e.target.value)}
            placeholder="Add new context (e.g., 'You are a helpful assistant')"
            className="flex-1"
            onKeyPress={(e) => e.key === 'Enter' && handleAddContext()}
          />
          <Button onClick={handleAddContext} variant="primary">
            Add
          </Button>
        </div>
        
        {contexts.length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            <p>No context added yet. Context helps guide the AI's responses.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {contexts.map((context) => (
              <div 
                key={context.id} 
                className="p-3 bg-gray-50 rounded-md border border-gray-200"
              >
                {editingId === context.id ? (
                  <div className="flex flex-col space-y-2">
                    <textarea
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      rows="3"
                    />
                    <div className="flex justify-end space-x-2">
                      <Button 
                        onClick={() => setEditingId(null)} 
                        variant="secondary" 
                        size="sm"
                      >
                        Cancel
                      </Button>
                      <Button 
                        onClick={() => handleEditSave(context.id)} 
                        variant="primary" 
                        size="sm"
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-gray-800 whitespace-pre-wrap">{context.text}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Added: {new Date(context.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditStart(context)}
                        className="text-gray-400 hover:text-blue-500"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleRemoveContext(context.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-4 p-3 bg-yellow-50 rounded-md border border-yellow-200">
          <h4 className="text-sm font-medium text-yellow-800 mb-1">Context Tips</h4>
          <ul className="text-xs text-yellow-700 list-disc pl-5 space-y-1">
            <li>Provide role definitions (e.g., "You are a historian")</li>
            <li>Set response format preferences (e.g., "Respond in bullet points")</li>
            <li>Include relevant background information</li>
            <li>Limit to 3-5 key context items for best results</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ContextManager;