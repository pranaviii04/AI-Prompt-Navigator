import React from "react";
import { useSettings } from "../contexts/SettingsContext";

const themes = ["System", "Light", "Dark"];
const languages = ["Auto-detect", "English", "Hindi", "Spanish"];
const spokenLanguages = ["Auto-detect", "English", "Hindi", "Tamil"];

const SettingsPage = ({ isOpen, onClose }) => {
  const {
    theme,
    setTheme,
    textSize,
    setTextSize,
    language,
    setLanguage,
    spokenLanguage,
    setSpokenLanguage,
  } = useSettings();

  const changeTextSize = (amount) => {
    setTextSize((prev) => Math.min(24, Math.max(12, prev + amount)));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className="bg-white dark:bg-gray-900 rounded-lg p-6 w-full max-w-md shadow-xl relative"
        style={{ fontSize: `${textSize}px` }}
      >
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
          Settings
        </h2>

        <form
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            onClose();
          }}
        >
          {/* Theme */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Theme
            </label>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-600"
            >
              {themes.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Text Size */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Text size
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => changeTextSize(-2)}
                className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded"
              >
                −
              </button>
              <button
                type="button"
                onClick={() => changeTextSize(2)}
                className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded"
              >
                +
              </button>
              <button
                type="button"
                onClick={() => setTextSize(16)}
                className="px-4 py-1 bg-gray-300 dark:bg-gray-600 rounded"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Language */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Language
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-600"
            >
              {languages.map((lang) => (
                <option key={lang}>{lang}</option>
              ))}
            </select>
          </div>

          {/* Spoken Language */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Spoken language
            </label>
            <select
              value={spokenLanguage}
              onChange={(e) => setSpokenLanguage(e.target.value)}
              className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-600"
            >
              {spokenLanguages.map((lang) => (
                <option key={lang}>{lang}</option>
              ))}
            </select>
            <p className="text-sm text-gray-500 mt-1">
              For best results, select the language you mainly speak. If it's
              not listed, it may still be supported via auto-detection.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex justify-end pt-2 gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-sm rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;
