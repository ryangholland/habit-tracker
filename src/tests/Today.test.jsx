import { render, screen } from "@testing-library/react";
import Today from "../pages/Today";
import { HabitProvider } from "../context/HabitProvider";
import { DeleteDialogProvider } from "../context/DeleteDialogProvider";

test("renders habits, form, and progress bar", () => {
  render(
    <HabitProvider>
      <DeleteDialogProvider>
        <Today />
      </DeleteDialogProvider>
    </HabitProvider>
  );

  expect(
    screen.getByText(/The journey of a thousand miles/i)
  ).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/add a habit/i)).toBeInTheDocument();
});
