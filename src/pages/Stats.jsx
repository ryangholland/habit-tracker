import HabitHeatmap from "../components/HabitHeatmap";
import WeeklyHabitTable from "../components/WeeklyHabitTable";

function Stats() {
  return (
    <>
      <h2 className="text-2xl">Stats</h2>
      <h3 className="text-xl mx-auto">History (Last 4 Months)</h3>
      <HabitHeatmap />
      <h3 className="text-xl mx-auto mb-2 md:mb-4">Weekly (Last 7 Days)</h3>
      <WeeklyHabitTable />
    </>
  );
}

export default Stats;
