import { useContext, useState } from "react";

import { SettingsContext } from "../context/SettingsContext";
import { AuthContext } from "../context/AuthContext";

import { useHabits } from "../hooks/useHabits";
import { useYesterday } from "../hooks/useYesterday";
import { useProgress } from "../hooks/useProgress";
import { useToggleHabitStatus } from "../hooks/useToggleHabitStatus";

import HabitList from "../components/habits/HabitList";
import AddHabitForm from "../components/habits/AddHabitForm";
import ProgressBar from "../components/common/ProgressBar";
import EditPastDaysDialog from "../components/habits/EditPastDaysDialog";
import QuoteCard from "../components/habits/QuoteCard";
import HabitSortLabel from "../components/habits/HabitSortLabel";
import { getQuoteOfTheDay } from "../utils/quotes";

function Yesterday() {
  const { habits, setHabits } = useHabits();
  const { weekday, isoDate, formatted } = useYesterday();
  const { progress } = useProgress(habits);
  const { sortOrder, showQuote } = useContext(SettingsContext);
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
        Yesterday, {formatted}
      </h2>

      {showQuote && <QuoteCard quote={getQuoteOfTheDay(new Date(isoDate))} />}

      {visibleHabits.length > 0 && <HabitSortLabel sortOrder={sortOrder} />}
      {visibleHabits.length > 0 && (
        <HabitList
          habits={visibleHabits}
          onToggle={(id) => toggleHabitStatus(id, isoDate)}
        />
      )}

      {visibleHabits.length === 0 && (
        <p className="text-gray-600 dark:text-gray-400 mt-6 mb-4 text-center">
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

export default Yesterday;
