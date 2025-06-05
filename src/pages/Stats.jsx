import HabitHeatmap from "../components/HabitHeatmap";
import WeeklyHabitTable from "../components/WeeklyHabitTable";
import StatsSummary from "../components/StatsSummary";

function Stats() {
  return (
    <>
      <h2 className="text-2xl">Stats</h2>
      <h3 className="text-xl mx-auto">History (Last 4 Months)</h3>
      <HabitHeatmap />
      <h3 className="text-xl mx-auto mb-2 md:mb-4">Weekly (Last 7 Days)</h3>
      <WeeklyHabitTable />
      <h3 className="text-xl mx-auto mt-6">Summary</h3>
      <StatsSummary />
    </>
  );
}

export default Stats;
