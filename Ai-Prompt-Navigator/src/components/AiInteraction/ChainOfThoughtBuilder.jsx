import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Button from '../Common/Button';
import Input from '../Common/Input';

const ChainOfThoughtBuilder = ({ initialSteps = [], onStepsChange }) => {
  const [steps, setSteps] = useState(initialSteps);
  const [newStep, setNewStep] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  const handleAddStep = () => {
    if (newStep.trim()) {
      const updatedSteps = [
        ...steps,
        {
          id: `step-${Date.now()}`,
          text: newStep.trim(),
          type: 'user-input' // Could be 'ai-response', 'user-input', etc.
        }
      ];
      setSteps(updatedSteps);
      onStepsChange(updatedSteps);
      setNewStep('');
    }
  };

  const handleEditStart = (step) => {
    setEditingId(step.id);
    setEditText(step.text);
  };

  const handleEditSave = (id) => {
    const updatedSteps = steps.map(step =>
      step.id === id ? { ...step, text: editText } : step
    );
    setSteps(updatedSteps);
    onStepsChange(updatedSteps);
    setEditingId(null);
  };

  const handleRemoveStep = (id) => {
    const updatedSteps = steps.filter(step => step.id !== id);
    setSteps(updatedSteps);
    onStepsChange(updatedSteps);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    
    const items = Array.from(steps);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setSteps(items);
    onStepsChange(items);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Chain of Thought Builder</h3>
        <p className="text-sm text-gray-500">
          Create multi-step prompts with logical progression
        </p>
      </div>
      
      <div className="p-4">
        <div className="flex space-x-2 mb-4">
          <Input
            type="text"
            value={newStep}
            onChange={(e) => setNewStep(e.target.value)}
            placeholder="Add a step (e.g., 'First, analyze this text...')"
            className="flex-1"
            onKeyPress={(e) => e.key === 'Enter' && handleAddStep()}
          />
          <Button onClick={handleAddStep} variant="primary">
            Add Step
          </Button>
        </div>
        
        {steps.length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            <p>No steps added yet. Build a sequence of thoughts or instructions.</p>
          </div>
        ) : (
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="steps">
              {(provided) => (
                <div 
                  {...provided.droppableProps} 
                  ref={provided.innerRef}
                  className="space-y-3"
                >
                  {steps.map((step, index) => (
                    <Draggable key={step.id} draggableId={step.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className="p-3 bg-gray-50 rounded-md border border-gray-200"
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex items-start">
                              <div 
                                {...provided.dragHandleProps}
                                className="mr-3 text-gray-400 hover:text-gray-600 cursor-grab"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16" />
                                </svg>
                              </div>
                              
                              {editingId === step.id ? (
                                <div className="flex-1">
                                  <textarea
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    rows="2"
                                  />
                                  <div className="flex justify-end space-x-2 mt-2">
                                    <Button 
                                      onClick={() => setEditingId(null)} 
                                      variant="secondary" 
                                      size="sm"
                                    >
                                      Cancel
                                    </Button>
                                    <Button 
                                      onClick={() => handleEditSave(step.id)} 
                                      variant="primary" 
                                      size="sm"
                                    >
                                      Save
                                    </Button>
                                  </div>
                                </div>
                              ) : (
                                <div className="flex-1">
                                  <div className="flex items-center mb-1">
                                    <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full mr-2">
                                      Step {index + 1}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                      {step.type === 'ai-response' ? 'AI Response' : 'User Input'}
                                    </span>
                                  </div>
                                  <p className="text-sm text-gray-800 whitespace-pre-wrap">{step.text}</p>
                                </div>
                              )}
                            </div>
                            
                            {editingId !== step.id && (
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => handleEditStart(step)}
                                  className="text-gray-400 hover:text-blue-500"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                  </svg>
                                </button>
                                <button
                                  onClick={() => handleRemoveStep(step.id)}
                                  className="text-gray-400 hover:text-red-500"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        )}
        
        <div className="mt-4 flex justify-between">
          <div className="flex space-x-2">
            <Button 
              onClick={() => {
                const updatedSteps = [...steps, {
                  id: `step-${Date.now()}`,
                  text: 'AI should analyze the previous steps and provide a comprehensive response',
                  type: 'ai-response'
                }];
                setSteps(updatedSteps);
                onStepsChange(updatedSteps);
              }}
              variant="secondary"
              size="sm"
              disabled={steps.length === 0}
            >
              Add AI Analysis Step
            </Button>
            <Button 
              onClick={() => {
                const updatedSteps = [...steps, {
                  id: `step-${Date.now()}`,
                  text: 'User should provide additional information',
                  type: 'user-input'
                }];
                setSteps(updatedSteps);
                onStepsChange(updatedSteps);
              }}
              variant="secondary"
              size="sm"
            >
              Add User Input Step
            </Button>
          </div>
          
          <Button 
            onClick={() => {
              setSteps([]);
              onStepsChange([]);
            }}
            variant="danger"
            size="sm"
            disabled={steps.length === 0}
          >
            Clear All Steps
          </Button>
        </div>
        
        <div className="mt-4 p-3 bg-purple-50 rounded-md border border-purple-200">
          <h4 className="text-sm font-medium text-purple-800 mb-1">Chain of Thought Tips</h4>
          <ul className="text-xs text-purple-700 list-disc pl-5 space-y-1">
            <li>Break complex tasks into smaller, sequential steps</li>
            <li>Alternate between user inputs and expected AI responses</li>
            <li>Use AI analysis steps to synthesize information</li>
            <li>Keep each step focused on a single task</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ChainOfThoughtBuilder;