import { useContext, useState } from "react";

import { SettingsContext } from "../context/SettingsContext";
import { AuthContext } from "../context/AuthContext";

import { useHabits } from "../hooks/useHabits";
import { useToday } from "../hooks/useToday";
import { useProgress } from "../hooks/useProgress";
import { useToggleHabitStatus } from "../hooks/useToggleHabitStatus";

import HabitList from "../components/habits/HabitList";
import AddHabitForm from "../components/habits/AddHabitForm";
import ProgressBar from "../components/common/ProgressBar";
import EditPastDaysDialog from "../components/habits/EditPastDaysDialog";
import QuoteCard from "../components/habits/QuoteCard";
import HabitSortLabel from "../components/habits/HabitSortLabel";

function Today() {
  const { habits, setHabits } = useHabits();
  const { weekday, isoDate } = useToday();
  const { progress } = useProgress(habits);
  const { sortOrder } = useContext(SettingsContext);
  const { showQuote } = useContext(SettingsContext);
  const { isGuest } = useContext(AuthContext);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const toggleHabitStatus = useToggleHabitStatus({
    habits,
    setHabits,
    isGuest,
  });

  const visibleHabits = habits.filter((habit) =>
    habit.activeDays?.includes(weekday)
  );

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
      {showQuote && <QuoteCard />}
      {visibleHabits.length > 0 && <HabitSortLabel sortOrder={sortOrder} />}
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
      {visibleHabits.length > 0 && (
        <div className="mt-6 text-center">
          <button
            onClick={() => setShowEditDialog(true)}
            className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline transition-colors cursor-pointer"
          >
            Missed a day?{" "}
            <span className="font-medium">Edit your past week here</span>
          </button>
        </div>
      )}

      <EditPastDaysDialog
        isOpen={showEditDialog}
        onClose={() => setShowEditDialog(false)}
      />
    </>
  );
}

export default Today;
