import HabitHeatmap from "../components/HabitHeatmap";

function Stats() {
  return (
    <>
      <h2 className="text-2xl">Stats</h2>
      <h3 className="text-xl mx-auto">History (Last 4 Months)</h3>
      <HabitHeatmap />
    </>
  );
}

export default Stats;
