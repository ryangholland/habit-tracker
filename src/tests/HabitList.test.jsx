import { render } from "@testing-library/react";
import HabitList from "../components/habits/HabitList";
import { screen } from "@testing-library/react";
import { vi } from "vitest";
import * as React from "react";
import { SettingsContext } from "../context/SettingsContext";

vi.mock("../components/habits/HabitItem", () => ({
  __esModule: true,
  default: ({ habit }) => <div data-testid="habit">{habit.name}</div>,
}));

describe("HabitList", () => {
  const baseHabits = [
    { id: 1, name: "Zebra", completedToday: false },
    { id: 2, name: "Apple", completedToday: true },
    { id: 3, name: "Monkey", completedToday: false },
  ];

  function renderWithSort(sortOrder = "default") {
    return render(
      <SettingsContext.Provider value={{ sortOrder }}>
        <HabitList habits={baseHabits} onToggle={vi.fn()} />
      </SettingsContext.Provider>
    );
  }

  test("renders habits in default order", () => {
    renderWithSort("default");
    const items = screen.getAllByTestId("habit").map((el) => el.textContent);
    expect(items).toEqual(["Zebra", "Apple", "Monkey"]);
  });

  test("sorts by name ascending", () => {
    renderWithSort("name-asc");
    const items = screen.getAllByTestId("habit").map((el) => el.textContent);
    expect(items).toEqual(["Apple", "Monkey", "Zebra"]);
  });

  test("sorts by name descending", () => {
    renderWithSort("name-desc");
    const items = screen.getAllByTestId("habit").map((el) => el.textContent);
    expect(items).toEqual(["Zebra", "Monkey", "Apple"]);
  });

  test("sorts incomplete first", () => {
    renderWithSort("incomplete-first");
    const items = screen.getAllByTestId("habit").map((el) => el.textContent);
    expect(items).toEqual(["Zebra", "Monkey", "Apple"]);
  });

  test("sorts complete first", () => {
    renderWithSort("complete-first");
    const items = screen.getAllByTestId("habit").map((el) => el.textContent);
    expect(items).toEqual(["Apple", "Zebra", "Monkey"]);
  });
});
