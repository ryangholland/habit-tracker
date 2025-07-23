import { useHabits } from "../../hooks/useHabits";
import { parseISO, subDays, formatISO } from "date-fns";

export function calculateStreak(
  history,
  activeDays = [0, 1, 2, 3, 4, 5, 6],
  upToDate = new Date()
) {
  const todayISO = formatISO(upToDate, { representation: "date" });

  // ========== Longest Streak ==========
  let longest = 0;
  let current = 0;
  let checkDate = subDays(upToDate, 1); // start from yesterday
  let daysChecked = 0;
  const maxDaysToCheck = 365;

  while (daysChecked < maxDaysToCheck) {
    const iso = formatISO(checkDate, { representation: "date" });
    const dayIndex = checkDate.getDay();

    if (!activeDays.includes(dayIndex)) {
      checkDate = subDays(checkDate, 1);
      daysChecked += 1;
      continue;
    }

    if (history[iso] === true) {
      current += 1;
      if (current > longest) longest = current;
    } else {
      current = 0;
    }

    checkDate = subDays(checkDate, 1);
    daysChecked += 1;
  }

  // ========== Active Streak ==========
  let active = 0;
  checkDate = subDays(upToDate, 1); // reset
  while (true) {
    const iso = formatISO(checkDate, { representation: "date" });
    const dayIndex = checkDate.getDay();

    if (!activeDays.includes(dayIndex)) {
      checkDate = subDays(checkDate, 1);
      continue;
    }

    if (history[iso] === true) {
      active += 1;
      checkDate = subDays(checkDate, 1);
    } else {
      break;
    }
  }

  return { longest, active };
}

export default function StatsSummary() {
  const { habits } = useHabits();

  const completionData = {};

  habits.forEach((habit) => {
    Object.entries(habit.history || {}).forEach(([date, completed]) => {
      const dayIndex = new Date(date + "T00:00:00").getDay();
      const isActive = habit.activeDays?.includes(dayIndex);

      if (!isActive) return;

      if (!completionData[date]) {
        completionData[date] = 0;
      }

      if (completed) {
        completionData[date] += 1;
      }
    });
  });

  const totalCompletions = Object.values(completionData).reduce(
    (sum, val) => sum + val,
    0
  );

  // Get only dates where *some* habit was active
  const filteredDates = Object.keys(completionData).filter((dateStr) => {
    const dayIndex = new Date(dateStr + "T00:00:00").getDay();
    return habits.some((habit) => habit.activeDays?.includes(dayIndex));
  });

  const averagePerDay =
    filteredDates.length > 0
      ? (totalCompletions / filteredDates.length).toFixed(1)
      : 0;

  let mostCompletedHabit = "";
  let maxCompletions = 0;

  habits.forEach((habit) => {
    const count = Object.values(habit.history || {}).filter(Boolean).length;
    if (count > maxCompletions) {
      maxCompletions = count;
      mostCompletedHabit = habit.name;
    }
  });

  let longestStreak = 0;
  let longestStreakHabit = "";
  let longestActiveStreak = 0;
  let longestActiveHabit = "";

  habits.forEach((habit) => {
    const { longest, active } = calculateStreak(
      habit.history || {},
      habit.activeDays || [0, 1, 2, 3, 4, 5, 6]
    );
    if (longest > longestStreak) {
      longestStreak = longest;
      longestStreakHabit = habit.name;
    }
    if (active > longestActiveStreak) {
      longestActiveStreak = active;
      longestActiveHabit = habit.name;
    }
  });

  return (
    <div className="p-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white space-y-3 text-sm sm:text-base max-w-2xl mx-auto">
      <div>
        <span className="font-semibold">Most Completed Habit:</span>{" "}
        {mostCompletedHabit} ({maxCompletions} completions)
      </div>
      <div>
        <span className="font-semibold">Longest Streak:</span>{" "}
        {longestStreak > 0
          ? `${longestStreak} days (${longestStreakHabit})`
          : "No streaks yet"}
      </div>
      <div>
        <span className="font-semibold">Longest Active Streak:</span>{" "}
        {longestActiveStreak > 0
          ? `${longestActiveStreak} days (${longestActiveHabit})`
          : "No active streaks"}
      </div>
      <div>
        <span className="font-semibold">Average Daily Completion Rate:</span>{" "}
        {averagePerDay} habits/day
      </div>
      <div>
        <span className="font-semibold">Total Habit Completions:</span>{" "}
        {totalCompletions}
      </div>
    </div>
  );
}
