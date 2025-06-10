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
    activeDays: [0, 1, 2, 3, 4, 5, 6],
  };
}

export function ensureTodayInHistory(habits, isoDate) {
  return habits.map((habit) => {
    const hasToday = habit.history?.hasOwnProperty(isoDate);
    const withActiveDays = habit.activeDays
      ? habit
      : { ...habit, activeDays: [0, 1, 2, 3, 4, 5, 6] };

    if (!hasToday) {
      return {
        ...withActiveDays,
        completedToday: false,
        history: {
          ...withActiveDays.history,
          [isoDate]: false,
        },
      };
    }
    return {
      ...withActiveDays,
      completedToday: withActiveDays.history[isoDate],
    };
  });
}
