import React from 'react';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  // hardcoded values change when backend is implemented
  const username = 'Pranavi'; 
  const credits = 90;
  const promptsToday = 3;
  const maxPrompts = 10;
  const subscription = 'Free Tier';
  const lastPromptTime = '2 hrs ago';

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Dashboard Panel */}
        <main className="p-6 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-4 border border-blue-100">
            <h1 className="text-2xl font-bold dark:text-blue-300 text-blue-600">🧠 Welcome Back, {username}!</h1>
            <p className="text-gray-600 dark:text-gray-200">
              Let’s craft your next perfect prompt. Need inspiration? Use the Generator below!
            </p>
          </div>

          {/* Quick Access Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mt-4">
            <Link
              to="/app/prompt-questionnaire"
              className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow hover:shadow-md border border-blue-100 hover:bg-blue-50 hover:-translate-y-1 transition-all"
            >
              ➕ <span className="font-medium dark:text-blue-300 text-blue-700">Generate Prompt</span>
            </Link>
            <Link
              to="/app/my-prompts"
              className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow hover:shadow-md border border-blue-100 hover:bg-blue-50 hover:-translate-y-1 transition-all"
            >
              📚 <span className="font-medium dark:text-blue-300 text-blue-700">My Prompt History</span>
            </Link>
          </div>

          {/* Usage Summary */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow border border-blue-100 mt-4">
            <h2 className="text-xl font-semibold mb-4 dark:text-blue-300  text-blue-700">📊 Your Usage Summary</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
              <div>
                Credits Remaining:{" "}
                <strong className="text-blue-600 dark:text-blue-300">{credits}</strong>
              </div>
            </div>
          </div>

          {/* Prompt Generator Preview */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow border border-blue-100 mt-6 space-y-3">
            <h2 className="text-xl font-semibold text-blue-700 dark:text-blue-300">🚀 Prompt Generator Preview</h2>
            <input
              type="text"
              placeholder="Describe your goal or idea..."
              className="text-gray-900 w-full rounded-md px-4 py-2 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-100"
            />
            <div>
              <Link to="/app/prompt-questionnaire">
                <button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-md shadow hover:from-blue-600 hover:to-indigo-700 hover:scale-[1.02] transition-transform dark-hover:from-blue-700 dark:hover:to-indigo-800">
                  ➡️ Start Prompt Refinement →
                </button>
              </Link>
            </div>
          </div>

          {/* Subscription Status */}
          <div className="bg-white-50 dark:bg-gray-800 p-4 border border-none-200 rounded-md mt-6 text-sm flex justify-between items-center">
            <span className="text-green-600 dark:text-green-400">
              💳 You’re on the Free Plan — 100 Credits Lifetime | 10 Credits / Prompt
            </span>
            <Link to="/app/plans" className="text-yellow-500  dark:text-yellow-400 font-semibold hover:underline">
              🔼 Upgrade to Pro
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
