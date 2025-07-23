import { useHabits } from "../../hooks/useHabits";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getLast7Days } from "../../utils/dateUtils";
import { FaCheck } from "react-icons/fa";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { supabase } from "../../supabaseClient";

export default function EditPastDaysDialog({ isOpen, onClose }) {
  const { isGuest } = useContext(AuthContext);
  const { habits, setHabits } = useHabits();
  const days = getLast7Days();

  const toggleCompletion = async (habitId, isoDate) => {
    const habit = habits.find((h) => h.id === habitId);
    if (!habit) return;

    const wasCompleted = habit.history?.[isoDate] === true;
    const newValue = !wasCompleted;

    // Optimistic local update (both guest and Supabase)
    const updated = habits.map((h) =>
      h.id === habitId
        ? {
            ...h,
            history: {
              ...h.history,
              [isoDate]: newValue,
            },
            completedToday:
              isoDate === new Date().toISOString().slice(0, 10)
                ? newValue
                : h.completedToday,
          }
        : h
    );
    setHabits(updated);

    if (isGuest) {
      localStorage.setItem("guest_habits", JSON.stringify(updated));
      return;
    }

    // Fire-and-forget Supabase request
    try {
      const { data: existing, error: fetchError } = await supabase
        .from("habit_history")
        .select("id")
        .eq("habit_id", habitId)
        .eq("date", isoDate)
        .maybeSingle();

      if (fetchError && fetchError.code !== "PGRST116") {
        console.error("Error checking history:", fetchError.message);
        return;
      }

      if (existing) {
        await supabase
          .from("habit_history")
          .update({ completed: newValue })
          .eq("id", existing.id);
      } else {
        await supabase.from("habit_history").insert({
          habit_id: habitId,
          date: isoDate,
          completed: newValue,
        });
      }
    } catch (err) {
      console.error("Failed to update habit history:", err);
    }
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
                          className={`p-2 border border-gray-300 dark:border-gray-700 ${
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
                          <div className="flex justify-center items-center min-h-[24px]">
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
                          </div>
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
              className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-md cursor-pointer"
            >
              Done
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
