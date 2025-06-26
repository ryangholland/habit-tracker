import { render, screen, fireEvent } from "@testing-library/react";
import { HabitProvider } from "../context/HabitProvider";
import { HabitContext } from "../context/HabitContext";
import AddHabitForm from "./AddHabitForm";
import { useContext } from "react";

function renderWithContext(ui) {
  return render(<HabitProvider>{ui}</HabitProvider>);
}

function TestConsumer({ onHabitsChange }) {
  const { habits } = useContext(HabitContext);
  onHabitsChange(habits);
  return null;
}

test("allows the user to add a habit", () => {
  renderWithContext(<AddHabitForm />);
  const input = screen.getByPlaceholderText(/add a habit/i);

  fireEvent.change(input, { target: { value: "Drink water" } });
  fireEvent.submit(input);

  expect(input).toHaveValue("");
});

test("newly added habit includes today's history entry", () => {
  const callback = vi.fn();
  render(
    <HabitProvider>
      <TestConsumer onHabitsChange={callback} />
      <AddHabitForm />
    </HabitProvider>
  );

  const input = screen.getByPlaceholderText(/add a habit/i);
  fireEvent.change(input, { target: { value: "Meditate" } });
  fireEvent.submit(input);

  const updatedHabits = callback.mock.calls[callback.mock.calls.length - 1][0];
  const newHabit = updatedHabits.find((h) => h.name === "Meditate");

  const isoDate = new Date().toISOString().slice(0, 10);
  expect(newHabit).toBeDefined();
  expect(newHabit.completedToday).toBe(false);
  expect(newHabit.history).toHaveProperty(isoDate);
  expect(newHabit.history[isoDate]).toBe(false);
});
