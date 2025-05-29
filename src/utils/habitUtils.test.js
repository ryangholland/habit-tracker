import { toggleHabit } from "./habitUtils";

test("toggles the completedToday status of the matching habit", () => {
  const habits = [
    { id: 1, name: "Test", completedToday: false },
    { id: 2, name: "Another", completedToday: true },
  ];

  const updated = toggleHabit(habits, 1);

  expect(updated).toEqual([
    { id: 1, name: "Test", completedToday: true },
    { id: 2, name: "Another", completedToday: true },
  ]);
});