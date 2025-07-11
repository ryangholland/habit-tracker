export function useProgress(habits, isoDate = null) {
  const dateKey = isoDate || new Date().toISOString().slice(0, 10);

  const completed = habits.filter((h) => h.history?.[dateKey] === true).length;
  const total = habits.length;

  const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

  return { completed, total, progress };
}