import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { SettingsProvider } from "./context/SettingsProvider";
import { HabitProvider } from "./context/HabitProvider";
import { DeleteDialogProvider } from "./context/DeleteDialogProvider";
import App from "./App";

export default function AuthGate() {
  const { authLoading } = useContext(AuthContext);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      </div>
    );
  }

  return (
    <SettingsProvider>
      <HabitProvider>
        <DeleteDialogProvider>
          <App />
        </DeleteDialogProvider>
      </HabitProvider>
    </SettingsProvider>
  );
}
