import {
  toggleHabit,
  createNewHabit,
  ensureTodayInHistory,
} from "../../utils/habitUtils";

describe("habitUtils", () => {
  const isoDate = "2025-07-03";

  describe("createNewHabit", () => {
    test("creates a new habit object with default values", () => {
      const habit = createNewHabit("Workout", isoDate);

      expect(habit.name).toBe("Workout");
      expect(habit.completedToday).toBe(false);
      expect(habit.activeDays).toEqual([0, 1, 2, 3, 4, 5, 6]);
      expect(habit.history).toEqual({ [isoDate]: false });
      expect(typeof habit.id).toBe("string");
    });
  });

  describe("toggleHabit", () => {
    test("toggles completion state for given habit and date", () => {
      const habits = [
        {
          id: "abc",
          name: "Read",
          completedToday: false,
          history: { [isoDate]: false },
        },
      ];

      const updated = toggleHabit(habits, "abc", isoDate);

      expect(updated[0].completedToday).toBe(true);
      expect(updated[0].history[isoDate]).toBe(true);

      const toggledBack = toggleHabit(updated, "abc", isoDate);
      expect(toggledBack[0].completedToday).toBe(false);
      expect(toggledBack[0].history[isoDate]).toBe(false);
    });

    test("does not modify other habits", () => {
      const habits = [
        {
          id: "abc",
          name: "Read",
          completedToday: false,
          history: { [isoDate]: false },
        },
        {
          id: "xyz",
          name: "Write",
          completedToday: true,
          history: { [isoDate]: true },
        },
      ];

      const updated = toggleHabit(habits, "abc", isoDate);

      expect(updated[1]).toEqual(habits[1]);
    });
  });

  describe("ensureTodayInHistory", () => {
    test("adds today's date to history if missing", () => {
      const habits = [
        {
          id: "abc",
          name: "Stretch",
          history: {},
          activeDays: [1, 2, 3],
        },
      ];

      const updated = ensureTodayInHistory(habits, isoDate);
      expect(updated[0].history[isoDate]).toBe(false);
      expect(updated[0].completedToday).toBe(false);
    });

    test("preserves existing today's completion value", () => {
      const habits = [
        {
          id: "abc",
          name: "Stretch",
          history: { [isoDate]: true },
          activeDays: [1, 2, 3],
        },
      ];

      const updated = ensureTodayInHistory(habits, isoDate);
      expect(updated[0].history[isoDate]).toBe(true);
      expect(updated[0].completedToday).toBe(true);
    });

    test("fills in missing activeDays with defaults", () => {
      const habits = [
        {
          id: "abc",
          name: "Stretch",
          history: {},
        },
      ];

      const updated = ensureTodayInHistory(habits, isoDate);
      expect(updated[0].activeDays).toEqual([0, 1, 2, 3, 4, 5, 6]);
    });
  });
});
