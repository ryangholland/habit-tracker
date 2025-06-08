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

  const [showQuote, setShowQuote] = useState(() => {
    const stored = localStorage.getItem("showQuote");
    return stored === null ? true : stored === "true";
  });

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("sortOrder", sortOrder);
  }, [sortOrder]);

  useEffect(() => {
    localStorage.setItem("showQuote", showQuote);
  }, [showQuote]);

  return (
    <SettingsContext.Provider
      value={{
        darkMode,
        setDarkMode,
        sortOrder,
        setSortOrder,
        showQuote,
        setShowQuote,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}
