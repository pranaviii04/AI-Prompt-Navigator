import React from 'react';
import { Link } from 'react-router-dom';

// import {
//   Home, MessageSquare, BookOpen, BarChart, CreditCard,
//   Settings, HelpCircle, User, LogOut, Search
// } from 'lucide-react';

const DashboardPage = () => {

  //hardcoded values change when backend is implemented
  const username = 'Pranavi'; // Replace with actual auth user
  const credits = 90;
  const promptsToday = 3;
  const maxPrompts = 10;
  const subscription = 'Free Tier';
  const lastPromptTime = '2 hrs ago';


  return (
    <div className=" flex min-h-screen ">
      

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        

        {/* Dashboard Panel */}
        <main className=" p-6 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-4">
            <h1 className="text-2xl font-bold">🧠 Welcome Back, {username}!</h1>
          <p className="text-gray-600 dark:text-gray-200">Let’s craft your next perfect prompt. Need inspiration? Use the Generator below!</p>
          </div>

          {/* Quick Access Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mt-4 ">
            <Link to="/app/prompt-questionnaire" className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow hover:shadow-md  dark:hover:shadow-gray-700 hover:-translate-y-1">
              ➕ <span className="font-medium">Generate Prompt</span>
            </Link>
            <Link to="/app/my-prompts" className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow hover:shadow-md dark:hover:shadow-gray-700 hover:-translate-y-1">
              📚 <span className="font-medium">My Prompt History</span>
            </Link>
            
          </div>

          {/* Usage Summary */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow  mt-4">
            <h2 className="text-xl font-semibold mb-4">📊 Your Usage Summary</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
              <div>Credits Remaining: <strong>{credits}</strong></div>
            </div>
          </div>

          {/* Prompt Generator Preview */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow  mt-6 space-y-3">
            <h2 className="text-xl font-semibold">🚀 Prompt Generator Preview</h2>
            <input
              type="text"
              placeholder="Describe your goal or idea..."
              className="text-gray-900 w-full rounded-md px-4 py-2 focus:outline-purple-500 dark:bg-gray-100"
            />
            <div>
              <Link to="/app/prompt-questionnaire">
              <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 hover:-translation-y-1">
                ➡️ Start Prompt Refinement →
              </button>
            </Link>
            </div>
            
          </div>

          {/* Subscription Status */}
          <div className="bg-yellow-50 dark:bg-gray-800 p-4 border border-yellow-300 rounded-md mt-6 text-sm flex justify-between items-center">
            <span>💳 You’re on the Free Plan — 100 Credits Lifetime | 10 Credits / Prompt</span>
            <Link to="/app/plans" className="text-purple-600 font-semibold hover:underline">🔼 Upgrade to Pro</Link>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
