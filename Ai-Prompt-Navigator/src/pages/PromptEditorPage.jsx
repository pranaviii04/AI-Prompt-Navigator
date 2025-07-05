import { useState } from 'react';
import { Save, Play, Settings, Upload } from 'lucide-react';

const PromptEditorPage = () => {
  const [promptText, setPromptText] = useState('');
  const [promptTitle, setPromptTitle] = useState('');
  const [category, setCategory] = useState('');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create Prompt</h1>
        <div className="flex space-x-2">
          <button className="flex items-center space-x-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg">
            <Save className="w-4 h-4" />
            <span>Save Draft</span>
          </button>
          <button className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
            <Play className="w-4 h-4" />
            <span>Test Prompt</span>
          </button>
        </div>
      </div>

      {/* Main Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Editor Panel */}
        <div className="lg:col-span-2 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Prompt Title
            </label>
            <input
              type="text"
              value={promptTitle}
              onChange={(e) => setPromptTitle(e.target.value)}
              placeholder="Enter a descriptive title for your prompt..."
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="">Select a category</option>
              <option value="email">Email</option>
              <option value="development">Development</option>
              <option value="marketing">Marketing</option>
              <option value="productivity">Productivity</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Prompt Content
            </label>
            <textarea
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              placeholder="Write your AI prompt here..."
              rows={12}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
            />
          </div>
        </div>

        {/* Settings Panel */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
              <Settings className="w-4 h-4 mr-2" />
              Prompt Settings
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Visibility
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm">
                  <option>Private</option>
                  <option>Team</option>
                  <option>Public</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Tags
                </label>
                <input
                  type="text"
                  placeholder="Add tags..."
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full flex items-center space-x-2 px-3 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                <Upload className="w-4 h-4" />
                <span>Import from file</span>
              </button>
              <button className="w-full flex items-center space-x-2 px-3 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                <Play className="w-4 h-4" />
                <span>Preview prompt</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptEditorPage;
