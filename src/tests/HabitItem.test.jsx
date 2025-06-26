import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HabitItem from "./HabitItem";
import { HabitProvider } from "../context/HabitProvider";
import { DeleteDialogProvider } from "../context/DeleteDialogProvider";
import { vi } from "vitest";

test("displays habit name and toggles checkbox", async () => {
  const habit = { id: 1, name: "Test Habit", completedToday: false };
  const toggleHabitStatus = vi.fn();

  render(
    <HabitProvider>
      <DeleteDialogProvider>
        <HabitItem habit={habit} toggleHabitStatus={toggleHabitStatus} />
      </DeleteDialogProvider>
    </HabitProvider>
  );

  expect(screen.getByText("Test Habit")).toBeInTheDocument();

  const checkbox = screen.getByTitle(/mark as complete/i);
  await userEvent.click(checkbox);

  expect(toggleHabitStatus).toHaveBeenCalledWith(1);
});
