export function toggleHabit(habits, id, isoDate) {
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
