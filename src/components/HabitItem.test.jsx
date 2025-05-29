import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HabitItem from "./HabitItem";

test("displays habit name and toggles checkbox", async () => {
  const habit = { id: 1, name: "Test Habit", completedToday: false };
  const toggleHabitStatus = vi.fn();

  render(<HabitItem habit={habit} toggleHabitStatus={toggleHabitStatus} />);

  expect(screen.getByText("Test Habit")).toBeInTheDocument();

  const checkbox = screen.getByRole("checkbox");
  await userEvent.click(checkbox);

  expect(toggleHabitStatus).toHaveBeenCalledWith(1);
});
