import { supabase } from "../../supabaseClient";

const daysOfWeek = [
  { label: "Sun", index: 0 },
  { label: "Mon", index: 1 },
  { label: "Tue", index: 2 },
  { label: "Wed", index: 3 },
  { label: "Thu", index: 4 },
  { label: "Fri", index: 5 },
  { label: "Sat", index: 6 },
];

const isEveryDay = (activeDays = []) =>
  activeDays.length === 7 &&
  [0, 1, 2, 3, 4, 5, 6].every((d) => activeDays.includes(d));

function ActiveDaySelector({
  habit,
  isGuest,
  habits,
  setHabits,
  saveToLocalStorage,
}) {
  const checkboxChecked = isEveryDay(habit.activeDays);
  const isLocked = checkboxChecked;

  const updateActiveDays = (id, newDays) => {
    const updated = habits.map((h) =>
      h.id === id ? { ...h, activeDays: newDays } : h
    );
    setHabits(updated);
    saveToLocalStorage(updated);
  };

  const handleToggleEveryDay = async () => {
    const enable = !checkboxChecked;
    const newDays = enable ? [0, 1, 2, 3, 4, 5, 6] : [];

    if (isGuest) {
      updateActiveDays(habit.id, newDays);
      return;
    }

    const { error } = await supabase
      .from("habits")
      .update({ active_days: newDays })
      .eq("id", habit.id);

    if (!error) {
      updateActiveDays(habit.id, newDays);
    }
  };

  const handleToggleDay = async (dayIndex) => {
    const isActive = habit.activeDays.includes(dayIndex);
    const newDays = isActive
      ? habit.activeDays.filter((d) => d !== dayIndex)
      : [...habit.activeDays, dayIndex];

    if (isGuest) {
      updateActiveDays(habit.id, newDays);
      return;
    }

    const { error } = await supabase
      .from("habits")
      .update({ active_days: newDays })
      .eq("id", habit.id);

    if (!error) {
      updateActiveDays(habit.id, newDays);
    }
  };

  return (
    <div className="py-4 space-y-2">
      <label className="block font-medium text-gray-900 dark:text-white text-sm">
        Active Days
      </label>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={checkboxChecked}
          onChange={handleToggleEveryDay}
          className="w-4 h-4 cursor-pointer"
          id={`everyday-${habit.id}`}
        />
        <label
          htmlFor={`everyday-${habit.id}`}
          className="text-sm text-black dark:text-white cursor-pointer"
          title="Check to enable all days. Uncheck to edit days manually."
        >
          Every Day
        </label>
      </div>

      <div className="flex gap-2 flex-wrap mt-2">
        {daysOfWeek.map(({ label, index }) => {
          const isActive = habit.activeDays.includes(index);

          return (
            <button
              key={index}
              onClick={() => handleToggleDay(index)}
              disabled={isLocked}
              className={`px-2 py-1 rounded-md text-sm border ${
                isActive
                  ? "bg-blue-600 text-white border-blue-700"
                  : "bg-gray-200 dark:bg-gray-700 text-black dark:text-white border-gray-400 dark:border-gray-600"
              } ${
                isLocked ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default ActiveDaySelector;
