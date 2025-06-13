import { useHabits } from "../hooks/useHabits";
import { useToday } from "../hooks/useToday";
import { useProgress } from "../hooks/useProgress";
import { useContext } from "react";
import { SettingsContext } from "../context/SettingsContext";
import { toggleHabit } from "../utils/habitUtils";
import { getQuoteOfTheDay } from "../utils/quotes";
import HabitList from "../components/HabitList";
import AddHabitForm from "../components/AddHabitForm";
import ProgressBar from "../components/ProgressBar";

function Today() {
  const { habits, setHabits } = useHabits();
  const { weekday, isoDate } = useToday();
  const { progress } = useProgress(habits);
  const { sortOrder } = useContext(SettingsContext);
  const { showQuote } = useContext(SettingsContext);

  const visibleHabits = habits.filter((habit) =>
    habit.activeDays?.includes(weekday)
  );

  const sortLabelMap = {
    default: "Default",
    "name-asc": "Name (A–Z)",
    "name-desc": "Name (Z–A)",
    "incomplete-first": "Incomplete First",
    "complete-first": "Complete First",
  };

  const toggleHabitStatus = (id) => {
    setHabits((prevHabits) => toggleHabit(prevHabits, id, isoDate));
  };

  return (
    <>
      <h2 className="text-2xl text-black font-semibold dark:text-white">
        {" "}
        {new Date().toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </h2>
      {showQuote && (
        <div className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg p-2 border border-gray-300 dark:border-gray-600 shadow-sm mt-2">
          <p className="italic text-base leading-relaxed before:content-['“'] after:content-['”']">
            {getQuoteOfTheDay()}
          </p>
        </div>
      )}
      {visibleHabits.length > 0 && (
        <p className="text-sm text-gray-600 dark:text-gray-400 italic mt-2 text-right">
          Sorted: {sortLabelMap[sortOrder]}
        </p>
      )}
      {visibleHabits.length > 0 && (
        <HabitList habits={visibleHabits} onToggle={toggleHabitStatus} />
      )}
      {visibleHabits.length === 0 && (
        <p className="text-gray-600 dark:text-gray-400">
          No habits added yet. Start by adding a habit below.
        </p>
      )}
      <AddHabitForm />
      {visibleHabits.length > 0 && <ProgressBar progress={progress} />}
    </>
  );
}

export default Today;
