import { render, screen, fireEvent } from "@testing-library/react";
import HabitSettingsItem from "../components/settings/HabitSettingsItem";
import { vi } from "vitest";

vi.mock("../components/settings/HabitNameEditor", () => ({
  __esModule: true,
  default: ({ habit }) => <div data-testid="habit-name">{habit.name}</div>,
}));

vi.mock("../components/settings/ActiveDaySelector", () => ({
  __esModule: true,
  default: () => <div data-testid="active-day-selector">Days</div>,
}));

describe("HabitSettingsItem", () => {
  const habit = {
    id: "habit-1",
    name: "Read",
    activeDays: [0, 1, 2, 3, 4, 5, 6],
    history: {},
    completedToday: false,
  };

  const baseProps = {
    habit,
    isGuest: true,
    habits: [habit],
    setHabits: vi.fn(),
    saveToLocalStorage: vi.fn(),
    openDeleteDialog: vi.fn(),
    setHabitToClear: vi.fn(),
  };

  test("renders disclosure open if defaultOpen is true", () => {
    render(<HabitSettingsItem {...baseProps} defaultOpen={true} />);

    expect(screen.getByTestId("active-day-selector")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /clear history/i })
    ).toBeInTheDocument();
  });

  test("calls setHabitToClear when 'Clear History' clicked", () => {
    render(<HabitSettingsItem {...baseProps} defaultOpen={true} />);

    fireEvent.click(screen.getByRole("button", { name: /clear history/i }));
    expect(baseProps.setHabitToClear).toHaveBeenCalledWith(habit);
  });

  test("calls openDeleteDialog when 'Delete Habit' clicked", () => {
    render(<HabitSettingsItem {...baseProps} defaultOpen={true} />);

    fireEvent.click(screen.getByRole("button", { name: /delete habit/i }));
    expect(baseProps.openDeleteDialog).toHaveBeenCalledWith(habit);
  });
});
