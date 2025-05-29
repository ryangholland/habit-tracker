import { toggleHabit, createNewHabit } from "./habitUtils";

test("toggles completedToday and updates history for the correct habit", () => {
  const habits = [
    {
      id: 1,
      name: "Test Habit",
      completedToday: false,
      history: { "2025-05-28": false },
    },
    {
      id: 2,
      name: "Other Habit",
      completedToday: false,
      history: { "2025-05-28": false },
    },
  ];

  const isoDate = "2025-05-28";
  const updated = toggleHabit(habits, 1, isoDate);

  expect(updated[0].completedToday).toBe(true);
  expect(updated[0].history[isoDate]).toBe(true);

  // Make sure other habits were untouched
  expect(updated[1]).toEqual(habits[1]);
});

test("createNewHabit returns a valid habit object", () => {
  const isoDate = "2025-05-29";
  const name = "Stretch";

  const habit = createNewHabit(name, isoDate);

  expect(habit).toHaveProperty("id");
  expect(habit.name).toBe(name);
  expect(habit.completedToday).toBe(false);
  expect(habit.history).toEqual({ [isoDate]: false });
});
