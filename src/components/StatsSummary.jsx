import { useHabits } from "../hooks/useHabits";
import { parseISO, isBefore, isEqual, subDays, formatISO } from "date-fns";

function calculateStreak(history, upToDate = new Date()) {
  const dates = Object.keys(history).sort();
  let longest = 0;
  let current = 0;
  let prev = null;

  dates.forEach((dateStr) => {
    const completed = history[dateStr];
    if (!completed) {
      current = 0;
      return;
    }

    const date = parseISO(dateStr);

    if (
      prev &&
      isEqual(date, subDays(prev, -1)) // current = previous + 1 day
    ) {
      current += 1;
    } else {
      current = 1;
    }

    if (current > longest) longest = current;
    prev = date;
  });

  // Check if current streak is still going today
  const todayISO = formatISO(upToDate, { representation: "date" });
  const active = history[todayISO] ? current : 0;

  return { longest, active };
}

export default function StatsSummary() {
  const { habits } = useHabits();

  const completionData = {};

  habits.forEach((habit) => {
    Object.entries(habit.history || {}).forEach(([date, completed]) => {
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
  const averagePerDay =
    completionData && Object.keys(completionData).length > 0
      ? (totalCompletions / Object.keys(completionData).length).toFixed(1)
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
    const { longest, active } = calculateStreak(habit.history || {});
    if (longest > longestStreak) {
      longestStreak = longest;
      longestStreakHabit = habit.name;
    }
    if (active > longestActiveStreak) {
      longestActiveStreak = active;
      longestActiveHabit = habit.name;
    }
  });

  // TEMP: placeholder values while we build the real logic
  const stats = {
    mostCompletedHabit: "Drink Water",
    longestStreak: 8,
    longestActiveStreak: 4,
    averagePerDay: 3.1,
    totalCompletions: 186,
  };

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
