import { render, screen } from "@testing-library/react";
import StatsSummary from "./StatsSummary";
import { HabitContext } from "../context/HabitContext";
import { formatISO } from "date-fns";

function renderWithHabits(habits) {
  return render(
    <HabitContext.Provider value={{ habits }}>
      <StatsSummary />
    </HabitContext.Provider>
  );
}

test("renders summary stats correctly from provided habits", () => {
  const todayISO = formatISO(new Date(), { representation: "date" });

  const habits = [
    {
      id: 1,
      name: "Read",
      completedToday: true,
      history: {
        [todayISO]: true,
        "2025-06-05": true,
        "2025-06-04": true,
      },
    },
    {
      id: 2,
      name: "Workout",
      completedToday: false,
      history: {
        [todayISO]: false,
        "2025-06-04": true,
      },
    },
  ];

  renderWithHabits(habits);

  expect(screen.getByText(/Read \(\d+ completions\)/)).toBeInTheDocument();

  expect(screen.getByText(/Longest Streak:/i)).toBeInTheDocument();
  expect(screen.getByText(/Longest Active Streak:/i)).toBeInTheDocument();
  expect(screen.getByText(/Average Daily Completion Rate:/i)).toBeInTheDocument();

  const label = screen.getByText(/Total Habit Completions:/i);
  const container = label.closest("div");
  expect(container).toHaveTextContent("4");
});

test("handles empty habit history gracefully", () => {
  const habits = [
    { id: 1, name: "Empty Habit", completedToday: false, history: {} },
  ];

  renderWithHabits(habits);

  expect(screen.getByText(/No streaks yet/i)).toBeInTheDocument();
  expect(screen.getByText(/No active streaks/i)).toBeInTheDocument();
  expect(screen.getByText(/0 habits\/day/i)).toBeInTheDocument();
});
