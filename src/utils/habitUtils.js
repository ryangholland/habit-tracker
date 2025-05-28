export function toggleHabit(habits, id) {
  return habits.map((habit) =>
    habit.id === id
      ? { ...habit, completedToday: !habit.completedToday }
      : habit
  );
}
