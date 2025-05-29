import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HabitProvider } from "../context/HabitProvider";
import HabitList from "./HabitList";

test("renders all habits and allows toggling", async () => {
  render(
    <HabitProvider>
      <HabitList />
    </HabitProvider>
  );

  const checkboxes = screen.getAllByRole("checkbox");
  expect(checkboxes.length).toBeGreaterThan(0);

  await userEvent.click(checkboxes[0]);
});
