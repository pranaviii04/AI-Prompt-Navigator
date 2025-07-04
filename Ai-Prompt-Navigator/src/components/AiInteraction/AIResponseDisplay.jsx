import React, { useState, useRef } from 'react';
import Button from '../Common/Button';
import LoadingSpinner from '../Common/LoadingSpinner';

const AIResponseDisplay = ({ response, isLoading, onFeedback, onRegenerate }) => {
  const [feedback, setFeedback] = useState(null);
  const [copied, setCopied] = useState(false);
  const textAreaRef = useRef(null);

  const handleCopy = () => {
    if (textAreaRef.current) {
      navigator.clipboard.writeText(textAreaRef.current.value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleFeedback = (value) => {
    setFeedback(value);
    onFeedback(value);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">AI Response</h3>
        <div className="flex space-x-2">
          {response && (
            <>
              <Button 
                onClick={handleCopy} 
                variant="secondary" 
                size="sm"
                disabled={copied}
              >
                {copied ? 'Copied!' : 'Copy'}
              </Button>
              <Button 
                onClick={onRegenerate} 
                variant="primary" 
                size="sm"
              >
                Regenerate
              </Button>
            </>
          )}
        </div>
      </div>
      
      <div className="p-4">
        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <LoadingSpinner size="lg" />
            <span className="ml-3 text-gray-500">Generating response...</span>
          </div>
        ) : response ? (
          <>
            <textarea
              ref={textAreaRef}
              value={response}
              readOnly
              className="w-full h-64 p-3 bg-gray-50 border border-gray-200 rounded-md font-mono text-sm whitespace-pre-wrap"
            />
            
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Was this response helpful?</h4>
              <div className="flex space-x-3">
                <Button
                  onClick={() => handleFeedback('positive')}
                  variant={feedback === 'positive' ? 'success' : 'outline'}
                  size="sm"
                >
                  👍 Yes
                </Button>
                <Button
                  onClick={() => handleFeedback('neutral')}
                  variant={feedback === 'neutral' ? 'secondary' : 'outline'}
                  size="sm"
                >
                  🤔 Somewhat
                </Button>
                <Button
                  onClick={() => handleFeedback('negative')}
                  variant={feedback === 'negative' ? 'danger' : 'outline'}
                  size="sm"
                >
                  👎 No
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-10 text-gray-500">
            <p>No response yet. Run a prompt to see the AI's output here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIResponseDisplay;