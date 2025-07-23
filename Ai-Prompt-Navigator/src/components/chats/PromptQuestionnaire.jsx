import React, { useState, useRef, useEffect } from 'react';

// Mock AI service functions for demo - replace with your actual imports
const generateQuestions = async (input) => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  return {
    questions: [
      "What specific outcome are you hoping to achieve?",
      "Who is your target audience for this?",
      "What tone or style would you prefer?",
      "Are there any constraints or requirements I should know about?",
      "What specific outcome are you hoping to achieve?",
      "Who is your target audience for this?",
      "What tone or style would you prefer?",
      "Are there any constraints or requirements I should know about?"
    ]
  };
};

const generatePrompt = async (answers) => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  return {
    prompt: `Create content that ${answers[0]}, targeting ${answers[1]}, using a ${answers[2]} tone, while considering ${answers[3]}. Ensure the output is comprehensive and addresses all the key points mentioned.`
  };
};

const PromptQuestionnaire = () => {
  const [input, setInput] = useState('');
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [finalPrompt, setFinalPrompt] = useState('');
  const [chat, setChat] = useState([]);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chat, loading]);

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

  const Message = ({ role, content }) => (
    <div className={`flex ${role === 'user' ? 'justify-end' : 'justify-start'} mb-6 animate-in slide-in-from-bottom-4 duration-500`}>
      <div className="flex items-start max-w-[85%] gap-3">
        {role === 'assistant' && (
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg flex-shrink-0 ring-2 ring-purple-100">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        )}
        <div
          className={`px-6 py-4 rounded-2xl shadow-lg whitespace-pre-line leading-relaxed transition-all duration-300 hover:shadow-xl ${
            role === 'user' 
              ? 'bg-gradient-to-br from-blue-500 to-blue-600 border border-blue-300 dark:border-blue-700 text-white rounded-br-md' 
              : 'bg-white text-gray-800 border border-gray-100  rounded-bl-md'
          }`}
        >
          {content}
        </div>
        {role === 'user' && (
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg flex-shrink-0 ring-2 ring-blue-100">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );

  const ProgressBar = () => (
    <div className="w-full bg-gray-300  rounded-full h-3 overflow-hidden shadow-inner">
      <div 
        className="bg-gradient-to-r from-purple-500 to-indigo-500 h-3 rounded-full transition-all duration-700 ease-out shadow-sm"
        style={{ width: `${questions.length > 0 ? ((answers.length / questions.length) * 100) : 0}%` }}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900  transition-colors duration-300 ">
      <div className="max-w-8xl mx-auto">
        <div className="bg-white/90  backdrop-blur-xl rounded-3xl shadow-2xl  overflow-hidden min-h-[85vh] relative">
          
          {/* Enhanced Header */}
          <div className="relative bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white py-8 px-8 overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full -translate-x-48 -translate-y-48 blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-white/5 rounded-full translate-x-36 translate-y-36 blur-2xl"></div>
            <div className="relative z-10 text-center">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-white/20 rounded-3xl flex items-center justify-center mr-4 backdrop-blur-sm border border-white/30">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                
              </div>
              <p className="text-blue-100 text-xl max-w-2xl mx-auto leading-relaxed">
                Transform your ideas into powerful prompts through intelligent conversation
              </p>
            </div>
          </div>

          {/* Progress Section */}
          {questions.length > 0 && (
            <div className="px-8 py-6 bg-white dark:bg-gray-900  border-gray-200 dark:border-gray-700 hover:shadow-xl">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wide">Progress</span>
                <span className="text-sm text-gray-600 bg-white px-3 py-1 rounded-full border">{answers.length} of {questions.length} completed</span>
              </div>
              <ProgressBar />
            </div>
          )}
          
          {/* Error Display */}
          {error && (
            <div className="mx-8 mt-6 bg-gradient-to-r from-red-50 to-pink-50 border-l-4 border-red-400 rounded-2xl p-6 shadow-lg animate-in slide-in-from-top-4 duration-500">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-red-800 font-bold text-lg">Something went wrong</h3>
                  <p className="text-red-700 mt-1">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Chat Container */}
          <div
            ref={chatContainerRef}
            className=" bg-white dark:bg-gray-900  shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl flex flex-col-reverse gap-2 px-8 overflow-y-auto flex-1 py-8 pb-32" 
            style={{ minHeight: '500px' }}
          >
            {[...chat].reverse().map((msg, idx) => (
              <Message key={idx} role={msg.role} content={msg.content} />
            ))}
            
            {/* Loading Animation */}
            {loading && (
              <div className="flex justify-center items-center mb-8 animate-in fade-in-50 duration-700">
                <div className="bg-white/90 backdrop-blur-sm rounded-full px-8 py-6 shadow-xl border border-white/50">
                  <div className="flex items-center space-x-4">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce"></div>
                      <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-gray-700 font-medium text-lg">AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}
            
            {/* Final Prompt Display */}
            {finalPrompt && (
              <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 border-2 border-emerald-200 rounded-3xl p-8 shadow-2xl animate-in slide-in-from-bottom-8 duration-700">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl flex items-center justify-center mr-4 shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-emerald-800 mb-1">Perfect!</h2>
                    <p className="text-emerald-600 text-lg">Your generated prompt is ready to use</p>
                  </div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border-2 border-emerald-100 shadow-inner">
                  <pre className="whitespace-pre-wrap text-gray-800 text-base leading-relaxed font-mono">{finalPrompt}</pre>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button 
                    onClick={() => navigator.clipboard.writeText(finalPrompt)}
                    className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy to Clipboard
                  </button>
                  <button 
                    onClick={() => window.location.reload()}
                    className="bg-white hover:bg-gray-50 text-emerald-600 border-2 border-emerald-300 px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Start Over
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Enhanced Input Section */}
          <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-200/50 py-6 bg-white dark:bg-gray-900/90 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl ">
            <div className="max-w-4xl mx-auto px-8">
              {/* Initial input */}
              {questions.length === 0 && !finalPrompt && !loading && (
                <form onSubmit={handleInputSubmit} className="flex gap-4 w-full">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      className="text-black/95 w-full border-2 border-gray-200 dark:border-gray-600/50 rounded-2xl px-6 py-4 pr-12 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 shadow-lg transition-all duration-200 text-base bg-white/80 backdrop-blur-sm placeholder-gray-500"
                      placeholder="Describe what you want to create..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      required
                    />
                    {/* <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </div> */}
                  </div>
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white dark:text-black px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
                    disabled={loading}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Start
                  </button>
                </form>
              )}
              
              {/* Answer input */}
              {questions.length > 0 && answers.length < questions.length && !finalPrompt && !loading && (
                <form onSubmit={handleAnswerSubmit} className="flex gap-4 w-full ">
                  <div className="flex-1 relative ">
                    <input
                      name="answer"
                      type="text"
                      className="text-black/95 w-full border-2 border-gray-200 rounded-2xl px-6 py-4 pr-12 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 shadow-lg transition-all duration-200 text-base bg-white/80 dark:bg-white backdrop-blur-sm placeholder-gray-500"
                      placeholder="Type your answer..."
                      autoFocus
                      required
                    />
                    {/* <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </div> */}
                  </div>
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    Send
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptQuestionnaire;