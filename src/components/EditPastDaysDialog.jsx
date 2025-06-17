import { useHabits } from "../hooks/useHabits";
import { getLast7Days } from "../utils/dateUtils";
import { FaCheck } from "react-icons/fa";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

export default function EditPastDaysDialog({ isOpen, onClose }) {
  const { habits, setHabits } = useHabits();
  const days = getLast7Days();

  const toggleCompletion = (habitId, isoDate) => {
    setHabits((prevHabits) =>
      prevHabits.map((habit) => {
        if (habit.id !== habitId) return habit;

        const wasCompleted = habit.history?.[isoDate] === true;
        const newHistory = {
          ...habit.history,
          [isoDate]: !wasCompleted,
        };

        // If toggling today, also update completedToday
        const todayISO = new Date().toISOString().slice(0, 10);
        const isToday = isoDate === todayISO;

        return {
          ...habit,
          history: newHistory,
          completedToday: isToday ? !wasCompleted : habit.completedToday,
        };
      })
    );
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        aria-hidden="true"
      />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full p-6 text-black dark:text-white overflow-auto max-h-[90vh]">
          <DialogTitle className="text-lg font-semibold mb-4 text-center">
            Edit Past 7 Days
          </DialogTitle>

          <div className="overflow-x-auto">
            <table className="table-auto w-full text-sm border border-gray-300 dark:border-gray-700">
              <thead>
                <tr>
                  <th className="p-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-left">
                    Habit
                  </th>
                  {days.map((day) => (
                    <th
                      key={day.iso}
                      className="p-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-center whitespace-nowrap"
                    >
                      {day.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {habits.map((habit) => (
                  <tr key={habit.id}>
                    <td className="p-2 border border-gray-300 dark:border-gray-700">
                      {habit.name}
                    </td>
                    {days.map((day) => {
                      const isCompleted = habit.history?.[day.iso] === true;
                      const isActiveDay = habit.activeDays?.includes(
                        new Date(day.iso + "T00:00:00").getDay()
                      );

                      return (
                        <td
                          key={day.iso}
                          className={`p-2 border border-gray-300 dark:border-gray-700 text-center ${
                            isActiveDay
                              ? "cursor-pointer hover:bg-blue-100 dark:hover:bg-gray-700"
                              : "opacity-40 cursor-not-allowed bg-gray-100 dark:bg-gray-800"
                          }`}
                          onClick={() => {
                            if (isActiveDay)
                              toggleCompletion(habit.id, day.iso);
                          }}
                          title={
                            isActiveDay
                              ? `Mark as ${
                                  isCompleted ? "incomplete" : "complete"
                                }`
                              : "Inactive day for this habit"
                          }
                        >
                          {isCompleted ? (
                            <FaCheck
                              className={
                                isActiveDay
                                  ? "text-blue-600 dark:text-blue-400"
                                  : "text-gray-400"
                              }
                            />
                          ) : (
                            <span className="text-gray-400">–</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-md"
            >
              Done
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
