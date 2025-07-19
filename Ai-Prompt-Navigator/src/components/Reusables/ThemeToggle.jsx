import { useSettings } from "../../contexts/SettingsContext";
import { Moon, Sun, Monitor } from "lucide-react"; // Optional icons

const ThemeToggle = ({ iconOnly = false }) => {
  const { theme, setTheme } = useSettings();

  const toggleTheme = () => {
    setTheme((prev) =>
      prev === "Light" ? "Dark" : prev === "Dark" ? "System" : "Light"
    );
  };

  const icon =
    theme === "Light" ? (
      <Sun size={18} />
    ) : theme === "Dark" ? (
      <Moon size={18} />
    ) : (
      <Monitor size={18} />
    );

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 px-2 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
    >
      {icon}
      {!iconOnly && <span className="capitalize">{theme} Mode</span>}
    </button>
  );
};

export default ThemeToggle;
