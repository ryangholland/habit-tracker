import { useState, useEffect } from "react";
import { SettingsContext } from "./SettingsContext";

export function SettingsProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem("darkMode");
    return stored === null ? true : stored === "true";
  });

  const [sortOrder, setSortOrder] = useState(() => {
    return localStorage.getItem("sortOrder") || "default";
  });

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("sortOrder", sortOrder);
  }, [sortOrder]);

  return (
    <SettingsContext.Provider
      value={{ darkMode, setDarkMode, sortOrder, setSortOrder }}
    >
      {children}
    </SettingsContext.Provider>
  );
}
