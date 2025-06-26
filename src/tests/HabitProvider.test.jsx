import { render } from "@testing-library/react";
import { HabitProvider } from "../context/HabitProvider";
import { HabitContext } from "../context/HabitContext";
import { useContext } from "react";

function TestConsumer({ callback }) {
  const { habits } = useContext(HabitContext);
  callback(habits);
  return null;
}

test("HabitProvider adds today's date to history if missing", () => {
  const isoDate = new Date().toISOString().slice(0, 10);
  const callback = vi.fn();

  render(
    <HabitProvider>
      <TestConsumer callback={callback} />
    </HabitProvider>
  );

  const habits = callback.mock.calls[0][0];
  for (const habit of habits) {
    expect(habit.history).toHaveProperty(isoDate);
    expect(typeof habit.history[isoDate]).toBe("boolean");
  }
});
