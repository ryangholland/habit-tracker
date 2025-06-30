import HabitHeatmap from "../components/stats/HabitHeatmap";
import WeeklyHabitTable from "../components/stats/WeeklyHabitTable";
import StatsSummary from "../components/stats/StatsSummary";
import StatsSection from "../components/stats/StatsSection";

function Stats() {
  return (
    <div className="min-h-0 flex flex-col">
      <h2 className="text-2xl font-semibold text-black dark:text-white">
        Stats
      </h2>
      <StatsSection title="Summary">
        <StatsSummary />
      </StatsSection>

      <StatsSection title="Weekly (Last 7 Days)">
        <WeeklyHabitTable />
      </StatsSection>

      <StatsSection title="History (Last 4 Months)">
        <HabitHeatmap />
      </StatsSection>
    </div>
  );
}

export default Stats;
