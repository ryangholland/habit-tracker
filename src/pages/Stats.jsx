import HabitHeatmap from "../components/HabitHeatmap";
import WeeklyHabitTable from "../components/WeeklyHabitTable";
import StatsSummary from "../components/StatsSummary";

function Stats() {
  return (
    <div className="min-h-0 flex flex-col">
      <h2 className="text-2xl font-semibold text-black dark:text-white">Stats</h2>
      <h3 className="text-xl text-gray-700 dark:text-gray-300 mx-auto mb-2 md:mb-4 mt-2 md:mt-4">
        Summary
      </h3>
      <StatsSummary />

      <h3 className="text-xl text-gray-700 dark:text-gray-300 mx-auto mb-2 md:mb-4 mt-6 md:mt-12">
        Weekly (Last 7 Days)
      </h3>
      <WeeklyHabitTable />
      <h3 className="text-xl text-gray-700 dark:text-gray-300 mx-auto mt-6 md:mt-12">
        History (Last 4 Months)
      </h3>
      <HabitHeatmap />
    </div>
  );
}

export default Stats;
