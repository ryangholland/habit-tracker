import { useHabits } from "../hooks/useHabits";
import CalendarHeatmap from "react-calendar-heatmap";
import { subDays } from "date-fns";
import "react-calendar-heatmap/dist/styles.css";
import '../components/HabitHeatmap.css'

// function generateDummyHeatmapData(days = 120) {
//   const today = new Date();
//   const data = [];

//   for (let i = 0; i <= days; i++) {
//     const date = new Date(today);
//     date.setDate(today.getDate() - i);

//     const iso = date.toISOString().slice(0, 10);
//     const total = Math.floor(Math.random() * 4) + 2; // 2–5 habits/day
//     const completed = Math.floor(Math.random() * (total + 1)); // 0–total
//     const count = total === 0 ? 0 : completed / total;

//     data.push({
//       date: iso,
//       completed,
//       total,
//       count,
//     });
//   }

//   return data.reverse(); // Keep chronological order
// }

// const dummyData = generateDummyHeatmapData();

function transformHabitsToHeatmap(habits) {
  const dateMap = {};

  habits.forEach((habit) => {
    Object.entries(habit.history || {}).forEach(([date, done]) => {
      if (!dateMap[date]) {
        dateMap[date] = { completed: 0, total: 0 };
      }
      dateMap[date].total += 1;
      if (done) dateMap[date].completed += 1;
    });
  });

  return Object.entries(dateMap).map(([date, { completed, total }]) => ({
    date,
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
    <div className="overflow-x-auto pb-4 mt-2 md:mt-4">
      <CalendarHeatmap
        startDate={subDays(new Date(), 120)}
        endDate={new Date()}
        values={heatmapData}
        classForValue={getClassForValue}
        tooltipDataAttrs={(value) =>
          value && value.date
            ? {
                "data-tip": `${value.date}: ${value.completed} of ${value.total} habits`,
              }
            : { "data-tip": "No data" }
        }
        showWeekdayLabels={false}
      />
    </div>
  );
}
