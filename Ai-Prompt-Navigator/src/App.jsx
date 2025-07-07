import { useState } from 'react';
import MultimodalInput from './components/AiInteraction/MultimodalInput';
import ChainOfThoughtBuilder from './components/AiInteraction/ChainOfThoughtBuilder';
import ContextManager from './components/AiInteraction/ContextManager';
import AIResponseDisplay from './components/AiInteraction/AIResponseDisplay';
import AiModelSelector from './components/AiInteraction/AiModelSelector';
import UserProfile from './components/UserManagement/UserProfile';
import BillingSubscription from './components/UserManagement/BillingSubscription';
import TeamManagement from './components/UserManagement/TeamManagement';
// import './App.css';

function App() {/*
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [steps, setSteps] = useState([]);
  const [contexts, setContexts] = useState([]);
  const [selectedModel, setSelectedModel] = useState('gemini');
  const [aiResponse, setAiResponse] = useState('This is a sample AI response.');
  const [isLoading, setIsLoading] = useState(false);*/

  return (/*
    <div className="p-6 space-y-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">AI Prompt Navigator - Progress Demo</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <MultimodalInput onFilesSelected={setSelectedFiles} />
          <ChainOfThoughtBuilder initialSteps={steps} onStepsChange={setSteps} />
          <ContextManager initialContexts={contexts} onContextsChange={setContexts} />
        </div>
        <div className="space-y-6">
          <AiModelSelector selectedModel={selectedModel} onModelChange={setSelectedModel} />
          <AIResponseDisplay 
            response={aiResponse} 
            isLoading={isLoading} 
            onFeedback={() => {}} 
            onRegenerate={() => {}} 
          />
        </div>
      </div>
    </div>*/
    <div> 
      <TeamManagement/>
    </div>
  );
}

export default App;
