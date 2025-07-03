import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { HabitProvider } from "../../context/HabitProvider";
import { SettingsProvider } from "../../context/SettingsProvider";
import { DeleteDialogProvider } from "../../context/DeleteDialogProvider";

export function renderWithProviders(ui, { user = null, isGuest = true } = {}) {
  return render(
    <MemoryRouter>
      <AuthContext.Provider value={{ user, isGuest }}>
        <SettingsProvider>
          <HabitProvider>
            <DeleteDialogProvider>{ui}</DeleteDialogProvider>
          </HabitProvider>
        </SettingsProvider>
      </AuthContext.Provider>
    </MemoryRouter>
  );
}
