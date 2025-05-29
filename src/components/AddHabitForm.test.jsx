import { render, screen, fireEvent } from "@testing-library/react";
import { HabitProvider } from "../context/HabitProvider";
import AddHabitForm from "./AddHabitForm";

function renderWithContext(ui) {
  return render(<HabitProvider>{ui}</HabitProvider>);
}

test("allows the user to add a habit", () => {
  renderWithContext(<AddHabitForm />);
  const input = screen.getByPlaceholderText(/add a habit/i);

  fireEvent.change(input, { target: { value: "Drink water" } });
  fireEvent.submit(input);

  expect(input).toHaveValue("");
});
