import React from "react";
import { useSettings } from "../contexts/SettingsContext";

const themes = ["Light", "Dark"];
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
        className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded-xl p-6 w-full max-w-md shadow-2xl transition-all duration-300"
        style={{ fontSize: `${textSize}px` }}
      >
        <h2 className="text-2xl font-semibold mb-4">Settings</h2>

        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            onClose();
          }}
        >
          {/* Theme */}
          <div>
            <label className="block text-sm font-medium mb-1">Theme</label>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
            >
              {themes.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Text Size */}
          <div>
            <label className="block text-sm font-medium mb-1">Text Size</label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => changeTextSize(-2)}
                className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
              >
                −
              </button>
              <button
                type="button"
                onClick={() => changeTextSize(2)}
                className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
              >
                +
              </button>
              <button
                type="button"
                onClick={() => setTextSize(16)}
                className="px-4 py-1 rounded-md bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Language */}
          <div>
            <label className="block text-sm font-medium mb-1">Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
            >
              {languages.map((lang) => (
                <option key={lang}>{lang}</option>
              ))}
            </select>
          </div>

          {/* Spoken Language */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Spoken Language
            </label>
            <select
              value={spokenLanguage}
              onChange={(e) => setSpokenLanguage(e.target.value)}
              className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
            >
              {spokenLanguages.map((lang) => (
                <option key={lang}>{lang}</option>
              ))}
            </select>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              For best results, select the language you mainly speak. If it's
              not listed, auto-detection may still work.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400 text-sm dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm"
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
