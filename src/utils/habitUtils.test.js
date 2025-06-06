import { toggleHabit, createNewHabit } from "./habitUtils";
import { ensureTodayInHistory } from "./habitUtils";

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

test("adds today's entry to habits if missing", () => {
  const isoDate = "2025-06-06";

  const habits = [
    {
      id: 1,
      name: "Read",
      completedToday: false,
      history: {
        "2025-06-05": true,
      },
    },
    {
      id: 2,
      name: "Stretch",
      completedToday: true,
      history: {
        "2025-06-06": true,
      },
    },
  ];

  const result = ensureTodayInHistory(habits, isoDate);

  expect(result[0].history).toHaveProperty(isoDate);
  expect(result[0].history[isoDate]).toBe(false);
  expect(result[0].completedToday).toBe(false);

  expect(result[1].history[isoDate]).toBe(true);
  expect(result[1].completedToday).toBe(true);
});