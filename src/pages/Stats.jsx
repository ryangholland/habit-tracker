import HabitHeatmap from "../components/HabitHeatmap";
import WeeklyHabitTable from "../components/WeeklyHabitTable";
import StatsSummary from "../components/StatsSummary";

function Stats() {
  return (
    <div className="min-h-0 flex flex-col">
      <h2 className="text-2xl text-black dark:text-white">Stats</h2>
      <h3 className="text-xl text-gray-700 dark:text-gray-300 mx-auto">
        History (Last 4 Months)
      </h3>
      <HabitHeatmap />
      <h3 className="text-xl text-gray-700 dark:text-gray-300 mx-auto mb-2 md:mb-4">
        Weekly (Last 7 Days)
      </h3>
      <WeeklyHabitTable />
      <h3 className="text-xl text-gray-700 dark:text-gray-300 mx-auto mt-8 md:mt-12">
        Summary
      </h3>
      <StatsSummary />
    </div>
  );
}

export default Stats;
