import { useHabits } from "../hooks/useHabits";
import { getLast7Days } from "../utils/dateUtils";
import { FaCheck } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

export default function WeeklyHabitTable() {
  const { habits } = useHabits();
  const days = getLast7Days();

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full text-sm text-left text-black dark:text-white border border-gray-300 dark:border-gray-700">
        <thead>
          <tr>
            <th className="p-2 border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800">
              Habit
            </th>
            {days.map((day) => (
              <th
                key={day.iso}
                className="p-2 border border-gray-300 dark:border-gray-700 text-center bg-gray-100 dark:bg-gray-800"
              >
                {day.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {habits.map((habit) => (
            <tr key={habit.id}>
              <td
                className="p-2 border border-gray-300 dark:border-gray-700 max-w-[70px] overflow-hidden text-ellipsis whitespace-nowrap"
                data-tooltip-id="habit-name-tooltip"
                data-tooltip-content={habit.name}
              >
                {habit.name}
              </td>
              {days.map((day) => (
                <td
                  key={day.iso}
                  className="p-2 border border-gray-300 dark:border-gray-700 text-center"
                >
                  {habit.history?.[day.iso] === true ? (
                    <FaCheck className="text-blue-600 dark:text-blue-400 text-xl inline" />
                  ) : (
                    <span className="text-gray-500 dark:text-gray-400 text-sm">
                      –
                    </span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Tooltip id="habit-name-tooltip" place="top" />
    </div>
  );
}
