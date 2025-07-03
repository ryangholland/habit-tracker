import { render, screen, fireEvent } from "@testing-library/react";
import ActiveDaySelector from "../components/settings/ActiveDaySelector";
import { vi } from "vitest";

describe("ActiveDaySelector", () => {
  const baseHabit = {
    id: "habit-1",
    name: "Read",
    activeDays: [1, 2, 3],
  };

  const habits = [baseHabit];
  const setHabits = vi.fn();
  const saveToLocalStorage = vi.fn();

  function renderSelector(overrides = {}) {
    render(
      <ActiveDaySelector
        habit={{ ...baseHabit, ...overrides }}
        isGuest={true}
        habits={habits}
        setHabits={setHabits}
        saveToLocalStorage={saveToLocalStorage}
      />
    );
  }

  test("renders all 7 day buttons", () => {
    renderSelector();
    const dayButtons = screen.getAllByRole("button", { name: /^[SMTWF]/i });
    expect(dayButtons).toHaveLength(7);
  });

  test("renders the 'Every Day' checkbox", () => {
    renderSelector();
    expect(screen.getByLabelText(/every day/i)).toBeInTheDocument();
  });

  test("disables individual day buttons when 'Every Day' is enabled", () => {
    renderSelector({ activeDays: [0, 1, 2, 3, 4, 5, 6] });
    const buttons = screen.getAllByRole("button", { name: /^[SMTWF]/i });
    buttons.forEach((btn) => expect(btn).toBeDisabled());
  });

  test("calls update functions when toggling a day", () => {
    renderSelector();
    const mondayBtn = screen.getByRole("button", { name: /mon/i });

    fireEvent.click(mondayBtn);

    expect(setHabits).toHaveBeenCalled();
    expect(saveToLocalStorage).toHaveBeenCalled();
  });

  test("toggles 'Every Day' checkbox", () => {
    renderSelector();
    const checkbox = screen.getByLabelText(/every day/i);
    fireEvent.click(checkbox);

    expect(setHabits).toHaveBeenCalled();
    expect(saveToLocalStorage).toHaveBeenCalled();
  });
});
