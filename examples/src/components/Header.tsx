import { SunIcon, MoonIcon } from "./icons";
import GithubIcon from "./icons/GithubIcon.tsx";

interface HeaderProps {
  isDark: boolean;
  onToggleDarkMode: () => void;
}

export const Header = ({ isDark, onToggleDarkMode }: HeaderProps) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
            React Konva Interactive Stage Demo
          </h1>
          <div className="flex items-center gap-4">
            <GithubIcon
              width={32}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer  transition-colors duration-200"
              onClick={() =>
                window.open(
                  "https://github.com/pierre-borckmans/react-konva-interactive-stage",
                  "_blank",
                )
              }
            />
            <button
              onClick={onToggleDarkMode}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer  transition-colors duration-200"
              aria-label="Toggle dark mode"
            >
              {isDark ? <SunIcon /> : <MoonIcon />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
