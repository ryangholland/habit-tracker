import { screen, fireEvent, waitFor, act } from "@testing-library/react";
import { vi } from "vitest";
import EditPastDaysDialog from "../components/habits/EditPastDaysDialog";
import { HabitContext } from "../context/HabitContext";
import { renderWithProviders } from "./utils/renderWithProviders";
import { getLast7Days } from "../utils/dateUtils";
import { useState } from "react";

// Mock Supabase insert/update logic
vi.mock("../supabaseClient", () => ({
  supabase: {
    from: () => ({
      select: () => ({
        eq: () => ({
          limit: () => ({
            maybeSingle: () => Promise.resolve({ data: null, error: null }),
          }),
        }),
      }),
      insert: () => Promise.resolve({ error: null }),
      update: () => ({
        eq: () => Promise.resolve({ error: null }),
      }),
    }),
  },
}));

// Fake habit data
const getMockHabits = () => [
  {
    id: "habit-1",
    name: "Read",
    activeDays: [0, 1, 2, 3, 4, 5, 6],
    completedToday: false,
    history: {
      [getLast7Days()[0].iso]: true,
      [getLast7Days()[1].iso]: false,
    },
  },
  {
    id: "habit-2",
    name: "Exercise",
    activeDays: [1, 3, 5], // Mon/Wed/Fri
    completedToday: false,
    history: {},
  },
];

// Wrapper to simulate HabitProvider state
function TestWrapper({ children }) {
  const [habits, setHabits] = useState(getMockHabits());
  return (
    <HabitContext.Provider value={{ habits, setHabits }}>
      {children}
    </HabitContext.Provider>
  );
}

// Tests
describe("EditPastDaysDialog", () => {
  test("renders dialog with habit names and days", async () => {
    renderWithProviders(
      <TestWrapper>
        <EditPastDaysDialog isOpen={true} onClose={vi.fn()} />
      </TestWrapper>,
      { isGuest: true }
    );

    expect(screen.getByText("Edit Past 7 Days")).toBeInTheDocument();
    expect(screen.getByText("Read")).toBeInTheDocument();
    expect(screen.getByText("Exercise")).toBeInTheDocument();
  });

  test("toggles checkbox when clicking active day", async () => {
    renderWithProviders(
      <TestWrapper>
        <EditPastDaysDialog isOpen={true} onClose={vi.fn()} />
      </TestWrapper>,
      { isGuest: true }
    );

    const readRow = screen.getByText("Read").closest("tr");
    const cell = readRow.querySelectorAll("td")[1];

    expect(cell.querySelector("svg")).toBeInTheDocument(); // ✓

    await act(async () => {
      fireEvent.click(cell);
    });

    await waitFor(() => {
      expect(cell.querySelector("svg")).not.toBeInTheDocument(); // now –
    });
  });

  test("inactive days are not clickable", async () => {
    renderWithProviders(
      <TestWrapper>
        <EditPastDaysDialog isOpen={true} onClose={vi.fn()} />
      </TestWrapper>,
      { isGuest: true }
    );

    const exerciseRow = screen.getByText("Exercise").closest("tr");
    const cells = exerciseRow.querySelectorAll("td");

    const inactiveCell = [...cells].find((td) =>
      td.className.includes("cursor-not-allowed")
    );

    expect(inactiveCell).toBeTruthy();

    await act(async () => {
      fireEvent.click(inactiveCell);
    });

    expect(inactiveCell.querySelector("svg")).not.toBeInTheDocument();
  });

  test("calls onClose when Done button is clicked", async () => {
    const mockClose = vi.fn();

    renderWithProviders(
      <TestWrapper>
        <EditPastDaysDialog isOpen={true} onClose={mockClose} />
      </TestWrapper>,
      { isGuest: true }
    );

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /done/i }));
    });

    expect(mockClose).toHaveBeenCalled();
  });
});
