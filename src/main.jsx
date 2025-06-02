import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { HabitProvider } from "./context/HabitProvider.jsx";
import { DeleteDialogProvider } from "./context/DeleteDialogProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HabitProvider>
      <DeleteDialogProvider>
        <App />
      </DeleteDialogProvider>
    </HabitProvider>
  </StrictMode>
);
