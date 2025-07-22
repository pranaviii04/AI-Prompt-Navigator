// src/components/chats/PromptCard.jsx
import { useState } from 'react';

const PromptCard = ({ title, content, createdAt, category }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  const getCategoryColor = (category) => {
    const colors = {
      Marketing: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300',
      Content: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      'E-commerce': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      Development: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
      default: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
    };
    return colors[category] || colors.default;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  };

  const truncateContent = (text, maxLength = 120) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:border-indigo-300 dark:hover:border-indigo-500 transition-all duration-300 hover:-translate-y-1">
      {/* Card Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white transition-colors duration-200 line-clamp-2">
            {title || "Untitled Prompt"}
          </h3>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-1 opacity-100 transition-opacity duration-200">
            <button
              onClick={() => setIsFavorited(!isFavorited)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              <svg 
                className={`w-4 h-4 ${isFavorited ? 'text-red-500 fill-current' : 'text-gray-400'}`} 
                fill={isFavorited ? 'currentColor' : 'none'} 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
            <button className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors duration-200 group/del">
              <svg className="w-4 h-4 text-gray-400 group-hover/del:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H8a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
            {/* <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button> */}
          </div>
        </div>

        {/* Category Badge */}
        {category && (
          <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${getCategoryColor(category)} mb-3`}>
            {category}
          </span>
        )}

        {/* Content */}
        <div className="mb-4">
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            {isExpanded ? content : truncateContent(content)}
          </p>
          
          {content.length > 120 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-2 text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 text-sm font-medium transition-colors duration-200"
            >
              {isExpanded ? '↑ Show less' : '↓ Read more'}
            </button>
          )}
        </div>
      </div>

      {/* Card Footer */}
      <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 rounded-b-2xl border-t border-gray-100 dark:border-gray-600">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {formatDate(createdAt)}
          </div>
          
          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1 px-2 py-1 text-xs text-gray-500 hover:text-indigo-500 dark:text-gray-400 dark:hover:text-indigo-400 hover:bg-white dark:hover:bg-gray-600 rounded-md transition-colors duration-200">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy
            </button>
            <button className="flex items-center gap-1 px-2 py-1 text-xs text-gray-500 hover:text-indigo-500 dark:text-gray-400 dark:hover:text-indigo-400 hover:bg-white dark:hover:bg-gray-600 rounded-md transition-colors duration-200">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptCard;