export function useYesterday() {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const formatted = yesterday.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const isoDate = yesterday.toISOString().slice(0, 10); // YYYY-MM-DD
  const weekday = yesterday.getDay(); // 0–6

  return { yesterday, formatted, isoDate, weekday };
}
