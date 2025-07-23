import { useHabits } from "../../hooks/useHabits";
import CalendarHeatmap from "react-calendar-heatmap";
import { Tooltip } from "react-tooltip";
import { subDays, formatISO } from "date-fns";
import { getHeatmapTooltipAttrs } from "../../utils/tooltipUtils";
import "react-calendar-heatmap/dist/styles.css";
import "react-tooltip/dist/react-tooltip.css";
import "../stats/HabitHeatmap.css";

function transformHabitsToHeatmap(habits) {
  const dateMap = {};
  const today = new Date();

  for (let i = 0; i <= 120; i++) {
    const date = subDays(today, i);
    const iso = formatISO(date, { representation: "date" });
    dateMap[iso] = { completed: 0, total: 0 };
  }

  habits.forEach((habit) => {
    const {
      history = {},
      activeDays = [0, 1, 2, 3, 4, 5, 6],
      createdAt,
    } = habit;
    const createdDate = new Date(createdAt);

    Object.keys(dateMap).forEach((isoDate) => {
      const date = new Date(isoDate + "T00:00:00");
      const dayIndex = date.getDay();
      const isActive = activeDays.includes(dayIndex);
      const hasBackfilled = history[isoDate] !== undefined;
    
      const isEligible =
        (createdDate <= date && isActive) || hasBackfilled;
    
      if (!isEligible) return;
    
      dateMap[isoDate].total += 1;
    
      if (history[isoDate] === true) {
        dateMap[isoDate].completed += 1;
      }
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
    <div className="mt-2 md:mt-4">
      <div className="w-full overflow-x-auto">
        <CalendarHeatmap
          startDate={subDays(new Date(), 120)}
          endDate={new Date()}
          values={heatmapData}
          classForValue={getClassForValue}
          tooltipDataAttrs={getHeatmapTooltipAttrs}
          showWeekdayLabels={false}
        />
      </div>
      <Tooltip id="heatmap-tooltip" />
    </div>
  );
}
