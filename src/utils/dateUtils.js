import { format, subDays } from "date-fns";

export function getLast7Days() {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const date = subDays(new Date(), i);
    days.push({
      iso: format(date, "yyyy-MM-dd"),
      label: format(date, "EEE M/d"), // e.g., Mon 6/3
    });
  }
  return days;
}
