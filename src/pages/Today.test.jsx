import { render, screen } from "@testing-library/react";
import Today from "./Today";
import { HabitProvider } from "../context/HabitProvider";

test("renders habits, form, and progress bar", () => {
  render(
    <HabitProvider>
      <Today />
    </HabitProvider>
  );

  expect(
    screen.getByText(/The journey of a thousand miles/i)
  ).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/add a habit/i)).toBeInTheDocument();
});
