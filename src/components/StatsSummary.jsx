import { useHabits } from "../hooks/useHabits";

export default function StatsSummary() {
  const { habits } = useHabits();

  // TEMP: placeholder values while we build the real logic
  const stats = {
    mostCompletedHabit: "Drink Water",
    longestStreak: 8,
    longestActiveStreak: 4,
    averagePerDay: 3.1,
    totalCompletions: 186,
  };

  return (
    <div className=" p-4 rounded-lg border border-gray-700 bg-gray-900 text-white space-y-3 text-sm sm:text-base max-w-2xl mx-auto">
      <div>
        <span className="font-semibold">Most Completed Habit:</span>{" "}
        {stats.mostCompletedHabit}
      </div>
      <div>
        <span className="font-semibold">Longest Streak:</span>{" "}
        {stats.longestStreak} days
      </div>
      <div>
        <span className="font-semibold">Longest Active Streak:</span>{" "}
        {stats.longestActiveStreak} days
      </div>
      <div>
        <span className="font-semibold">Average Daily Completion Rate:</span>{" "}
        {stats.averagePerDay} habits/day
      </div>
      <div>
        <span className="font-semibold">Total Habit Completions:</span>{" "}
        {stats.totalCompletions}
      </div>
    </div>
  );
}
