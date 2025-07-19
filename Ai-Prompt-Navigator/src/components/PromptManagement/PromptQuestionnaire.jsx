import React, { useState } from 'react';
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

  // ChatGPT-like message bubble
  const Message = ({ role, content }) => (
    <div className={`flex ${role === 'user' ? 'justify-end' : 'justify-start'} mb-2`}>
      <div
        className={`max-w-[80%] px-4 py-2 rounded-lg shadow text-base whitespace-pre-line '
          ${role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-900'}`}
      >
        {content}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 py-8">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Prompt Questionnaire</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="flex flex-col gap-2 mb-4 max-h-[60vh] overflow-y-auto">
          {chat.map((msg, idx) => (
            <Message key={idx} role={msg.role} content={msg.content} />
          ))}
        </div>
        {loading && (
          <div className="flex justify-center items-center mb-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mr-2"></div>
            <span>Loading...</span>
          </div>
        )}
        {/* Initial input */}
        {questions.length === 0 && !finalPrompt && !loading && (
          <form onSubmit={handleInputSubmit} className="flex gap-2">
            <input
              type="text"
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your initial statement..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              disabled={loading}
            >
              Start
            </button>
          </form>
        )}
        {/* Step-by-step Q&A */}
        {questions.length > 0 && answers.length < questions.length && !finalPrompt && !loading && (
          <form onSubmit={handleAnswerSubmit} className="flex gap-2 mt-2">
            <input
              name="answer"
              type="text"
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Type your answer..."
              autoFocus
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Send
            </button>
          </form>
        )}
        {/* Final prompt display */}
        {finalPrompt && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h2 className="text-lg font-semibold mb-2 text-green-700">Generated Prompt</h2>
            <pre className="whitespace-pre-wrap text-green-900">{finalPrompt}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default PromptQuestionnaire; 