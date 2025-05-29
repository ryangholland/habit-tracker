import { useToday } from "../hooks/useToday";

export function toggleHabit(habits, id) {
  const { isoDate } = useToday();

  return habits.map((habit) => {
    if (habit.id === id) {
      const completedToday = !habit.completedToday;
      const history = {
        ...habit.history,
        [isoDate]: completedToday,
      };
      return { ...habit, completedToday, history };
    }
    return habit;
  })
}
