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

export function ensureTodayInHistory(habits, isoDate) {
  return habits.map((habit) => {
    const hasToday = habit.history?.hasOwnProperty(isoDate);
    if (!hasToday) {
      return {
        ...habit,
        completedToday: false,
        history: {
          ...habit.history,
          [isoDate]: false,
        },
      };
    }
    return {
      ...habit,
      completedToday: habit.history[isoDate],
    };
  });
}
