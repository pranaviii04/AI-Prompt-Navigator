import React, { useState, useRef, useEffect } from 'react';
import { generateQuestions, generatePrompt } from '../../services/aiService';

const PromptQuestionnaire = () => {
  const [input, setInput] = useState('');
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [finalPrompt, setFinalPrompt] = useState('');
  const [chat, setChat] = useState([]); // For chat-like UI
  const chatContainerRef = useRef(null);

  // Scroll to bottom on new message
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chat, loading]);

  // Handle initial input submission
  const handleInputSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setQuestions([]);
    setAnswers([]);
    setCurrent(0);
    setFinalPrompt('');
    setChat([{ role: 'user', content: input }]);
    try {
      const res = await generateQuestions(input);
      setQuestions(res.questions);
      setChat((prev) => [
        ...prev,
        { role: 'assistant', content: 'Let me ask you a few questions to clarify:' },
        { role: 'assistant', content: res.questions[0] },
      ]);
    } catch (err) {
      setError('Failed to generate questions.');
    }
    setLoading(false);
  };

  // Handle answer submission for each question
  const handleAnswerSubmit = async (e) => {
    e.preventDefault();
    const answer = e.target.answer.value;
    if (!answer) return;
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    setChat((prev) => [
      ...prev,
      { role: 'user', content: answer },
    ]);
    if (current < questions.length - 1) {
      setCurrent(current + 1);
      setChat((prev) => [
        ...prev,
        { role: 'assistant', content: questions[current + 1] },
      ]);
    } else {
      // All questions answered, generate prompt
      setLoading(true);
      try {
        const res = await generatePrompt(newAnswers);
        setFinalPrompt(res.prompt);
        setChat((prev) => [
          ...prev,
          { role: 'assistant', content: 'Here is your generated prompt:' },
          { role: 'assistant', content: res.prompt },
        ]);
      } catch (err) {
        setError('Failed to generate prompt.');
      }
      setLoading(false);
    }
    e.target.reset();
  };

  // ChatGPT-like message bubble with improved styling
  const Message = ({ role, content }) => (
    <div className={`flex ${role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[75%] px-4 py-3 rounded-2xl shadow-sm text-base whitespace-pre-line leading-relaxed ${
          role === 'user' 
            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg' 
            : 'bg-gray-50 text-gray-800 border border-gray-100'
        }`}
        style={{
          boxShadow: role === 'user' 
            ? '0 4px 12px rgba(59, 130, 246, 0.3)' 
            : '0 2px 8px rgba(0, 0, 0, 0.05)'
        }}
      >
        {content}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col bg-gradient-to-br from-gray-50 via-white to-blue-50 p-6 min-h-full">
      {/* 3D Container Box */}
      <div className="flex flex-col bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden" 
           style={{
             boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
             transform: 'perspective(1000px) rotateX(2deg)',
             transformStyle: 'preserve-3d',
             minHeight: '80vh'
           }}>
        
        {/* Header with gradient background */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white py-6 px-6 shadow-lg relative">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-2">Generate Prompt</h1>
            <p className="text-center text-blue-100 text-sm">AI-powered prompt generation through intelligent questioning</p>
          </div>
          {/* 3D depth effect for header */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10"></div>
        </div>
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mx-6 mt-4 rounded-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Chat container with improved styling */}
        <div
          ref={chatContainerRef}
          className="flex flex-col-reverse gap-2 px-6 overflow-y-auto flex-1 py-6 relative" 
          style={{ paddingBottom: '100px', minHeight: '400px' }}
        >
          {[...chat].reverse().map((msg, idx) => (
            <Message key={idx} role={msg.role} content={msg.content} />
          ))}
          {loading && (
            <div className="flex justify-center items-center mb-6">
              <div className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-lg">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
                <span className="text-gray-600 text-sm">Generating...</span>
              </div>
            </div>
          )}
          {finalPrompt && (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 shadow-lg">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-lg font-semibold text-green-800">Generated Prompt</h2>
              </div>
              <pre className="whitespace-pre-wrap text-green-900 bg-white p-4 rounded-lg border border-green-200 text-sm leading-relaxed">{finalPrompt}</pre>
            </div>
          )}
        </div>

        {/* Input bar with improved styling */}
        <div className="bg-white/95 backdrop-blur-sm border-t border-gray-200 py-6 relative" 
             style={{
               boxShadow: '0 -4px 20px rgba(0,0,0,0.1)',
               background: 'linear-gradient(to bottom, rgba(255,255,255,0.95), rgba(255,255,255,0.98))'
             }}>
          <div className="max-w-3xl mx-auto px-6" style={{marginLeft: 'auto', marginRight: 'auto', transform: 'translateX(2rem)'}}>
            {/* Initial input */}
            {questions.length === 0 && !finalPrompt && !loading && (
              <form onSubmit={handleInputSubmit} className="flex gap-3 w-full">
                <input
                  type="text"
                  className="flex-1 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all duration-200 text-base"
                  placeholder="Enter your initial statement..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-blue-700 whitespace-nowrap font-medium shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                  disabled={loading}
                >
                  Start
                </button>
              </form>
            )}
            {/* Step-by-step Q&A */}
            {questions.length > 0 && answers.length < questions.length && !finalPrompt && !loading && (
              <form onSubmit={handleAnswerSubmit} className="flex gap-3 w-full">
                <input
                  name="answer"
                  type="text"
                  className="flex-1 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all duration-200 text-base"
                  placeholder="Type your answer..."
                  autoFocus
                  required
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-blue-700 whitespace-nowrap font-medium shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                >
                  Send
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptQuestionnaire; 