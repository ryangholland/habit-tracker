export function useProgress(habits) {
  const completed = habits.filter((h) => h.completedToday).length;
  const total = habits.length;

  const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

  return { completed, total, progress };
}
