import { render } from "@testing-library/react";
import HabitHeatmap from "./HabitHeatmap";
import { HabitContext } from "../context/HabitContext";

const mockHabits = [
  {
    id: 1,
    name: "Stretch",
    completedToday: false,
    history: {
      "2025-06-01": true,
      "2025-06-02": false,
    },
  },
  {
    id: 2,
    name: "Read",
    completedToday: false,
    history: {
      "2025-06-01": true,
      "2025-06-02": true,
    },
  },
];

function renderWithHabits(habits) {
  return render(
    <HabitContext.Provider value={{ habits }}>
      <HabitHeatmap />
    </HabitContext.Provider>
  );
}

test("renders calendar heatmap cells with data-tooltip-content", () => {
  const { container } = renderWithHabits(mockHabits);

  const tooltipCells = container.querySelectorAll("[data-tooltip-content]");
  expect(tooltipCells.length).toBeGreaterThan(0);

  const tooltipValues = Array.from(tooltipCells).map((el) =>
    el.getAttribute("data-tooltip-content")
  );

  const matched = tooltipValues.find((val) =>
    val?.includes("June 1") || val?.includes("June 2")
  );

  expect(matched).toBeDefined();
});
