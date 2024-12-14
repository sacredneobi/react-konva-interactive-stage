import { useState, useEffect } from "react";

// Initialize theme at module level to avoid flashing
const getInitialTheme = (defaultValue: boolean) => {
  // If running on server or in static generation, return default
  if (typeof window === "undefined") return defaultValue;

  const savedMode = localStorage.getItem("darkMode");
  const initialTheme = savedMode !== null ? savedMode === "true" : defaultValue;

  // Set initial theme before React hydration
  if (initialTheme) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  return initialTheme;
};

export function useDarkMode(defaultValue = true) {
  const [isDark, setIsDark] = useState(() => getInitialTheme(defaultValue));

  useEffect(() => {
    localStorage.setItem("darkMode", isDark.toString());

    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return [isDark, setIsDark] as const;
}
