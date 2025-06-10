import { useHabits } from "../hooks/useHabits";
import CalendarHeatmap from "react-calendar-heatmap";
import { Tooltip } from "react-tooltip";
import { subDays } from "date-fns";
import { getHeatmapTooltipAttrs } from "../utils/tooltipUtils";
import "react-calendar-heatmap/dist/styles.css";
import "react-tooltip/dist/react-tooltip.css";
import "../components/HabitHeatmap.css";

function transformHabitsToHeatmap(habits) {
  const dateMap = {};

  habits.forEach((habit) => {
    Object.entries(habit.history || {}).forEach(([date, done]) => {
      const dayIndex = new Date(date + "T00:00:00").getDay();
      if (!habit.activeDays?.includes(dayIndex)) return;

      if (!dateMap[date]) {
        dateMap[date] = { completed: 0, total: 0 };
      }

      dateMap[date].total += 1;
      if (done) dateMap[date].completed += 1;
    });
  });

  return Object.entries(dateMap).map(([date, { completed, total }]) => ({
    date: new Date(date + "T12:00:00"),
    completed,
    total,
    count: total === 0 ? 0 : completed / total,
  }));
}

const getClassForValue = (value) => {
  if (!value) return "color-empty";
  if (value.count === 0) return "color-scale-0";
  if (value.count < 0.25) return "color-scale-1";
  if (value.count < 0.5) return "color-scale-2";
  if (value.count < 0.75) return "color-scale-3";
  return "color-scale-4";
};

export default function HabitHeatmap({ data }) {
  const { habits } = useHabits();
  const heatmapData = transformHabitsToHeatmap(habits);

  return (
    <div className="overflow-x-auto  mt-2 md:mt-4">
      <CalendarHeatmap
        startDate={subDays(new Date(), 120)}
        endDate={new Date()}
        values={heatmapData}
        classForValue={getClassForValue}
        tooltipDataAttrs={getHeatmapTooltipAttrs}
        showWeekdayLabels={false}
      />
      <Tooltip id="heatmap-tooltip" />
    </div>
  );
}
