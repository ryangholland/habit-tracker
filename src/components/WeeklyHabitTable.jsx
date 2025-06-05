import { useHabits } from "../hooks/useHabits";
import { format, subDays } from "date-fns";
import { FaCheck } from "react-icons/fa";

function getLast7Days() {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const date = subDays(new Date(), i);
    days.push({
      iso: format(date, "yyyy-MM-dd"),
      label: format(date, "EEE M/d"), // e.g., Mon 6/3
    });
  }
  return days;
}

export default function WeeklyHabitTable() {
  const { habits } = useHabits();
  const days = getLast7Days();

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full text-sm text-left text-white border border-gray-700">
        <thead>
          <tr>
            <th className="p-2 border border-gray-700">Habit</th>
            {days.map((day) => (
              <th
                key={day.iso}
                className="p-2 border border-gray-700 text-center"
              >
                {day.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {habits.map((habit) => (
            <tr key={habit.id}>
              <td className="p-2 border border-gray-700 max-w-[80px] overflow-hidden text-ellipsis whitespace-nowrap">
                {habit.name}
              </td>
              {days.map((day) => (
                <td
                  key={day.iso}
                  className="p-2 border border-gray-700 text-center"
                >
                  {habit.history?.[day.iso] === true ? (
                    <FaCheck className="text-blue-500 text-xl inline" />
                  ) : (
                    <span className="text-gray-500 text-sm">–</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
