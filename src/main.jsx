import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { HabitProvider } from "./context/HabitProvider.jsx";
import { DeleteDialogProvider } from "./context/DeleteDialogProvider.jsx";
import { SettingsProvider } from "./context/SettingsProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SettingsProvider>
      <HabitProvider>
        <DeleteDialogProvider>
          <App />
        </DeleteDialogProvider>
      </HabitProvider>
    </SettingsProvider>
  </StrictMode>
);
