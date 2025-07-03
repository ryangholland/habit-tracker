import { render, screen } from "@testing-library/react";
import Today from "../pages/Today";

import { AuthProvider } from "../context/AuthProvider";
import { SettingsProvider } from "../context/SettingsProvider";
import { HabitProvider } from "../context/HabitProvider";
import { DeleteDialogProvider } from "../context/DeleteDialogProvider";

function renderTodayPage() {
  return render(
    <AuthProvider>
      <SettingsProvider>
        <HabitProvider>
          <DeleteDialogProvider>
            <Today />
          </DeleteDialogProvider>
        </HabitProvider>
      </SettingsProvider>
    </AuthProvider>
  );
}

describe("Today Page (Guest Mode)", () => {
  test("renders the current date", () => {
    renderTodayPage();

    const today = new Date().toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    expect(screen.getByText(today)).toBeInTheDocument();
  });

  test("renders the Add Habit input", () => {
    renderTodayPage();
    expect(
      screen.getByPlaceholderText(/add a habit/i)
    ).toBeInTheDocument();
  });

  test("renders a motivational quote", () => {
    renderTodayPage();
    const quote = screen.getByText((text, node) => {
      return (
        node?.tagName.toLowerCase() === "p" &&
        text.length > 20 &&
        node.className.includes("italic")
      );
    });
    expect(quote).toBeInTheDocument();
  });
});
