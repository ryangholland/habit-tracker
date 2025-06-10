export function useToday() {
  const today = new Date();

  const formatted = today.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const isoDate = today.toISOString().slice(0, 10); // YYYY-MM-DD

  const weekday = today.getDay();

  return { today, formatted, isoDate, weekday };
}
