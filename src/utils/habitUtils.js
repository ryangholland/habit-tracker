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
  });
}

export function createNewHabit(name, isoDate) {
  return {
    id: crypto.randomUUID(),
    name,
    completedToday: false,
    history: {
      [isoDate]: false,
    },
  };
}
