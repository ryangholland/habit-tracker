import { useState, useEffect } from "react";
import { SettingsContext } from "./SettingsContext";

export function SettingsProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <SettingsContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </SettingsContext.Provider>
  );
}
