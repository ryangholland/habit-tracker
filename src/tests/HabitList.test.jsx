import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HabitProvider } from "../context/HabitProvider";
import { DeleteDialogProvider } from "../context/DeleteDialogProvider";
import HabitList from "./HabitList";

test("renders all habits and allows toggling", async () => {
  render(
    <HabitProvider>
      <DeleteDialogProvider>
        <HabitList />
      </DeleteDialogProvider>
    </HabitProvider>
  );

  const checkboxes = screen.getAllByRole("checkbox");
  expect(checkboxes.length).toBeGreaterThan(0);

  await userEvent.click(checkboxes[0]);
});
