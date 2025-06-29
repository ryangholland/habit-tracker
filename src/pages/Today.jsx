import { useHabits } from "../hooks/useHabits";
import { useToday } from "../hooks/useToday";
import { useProgress } from "../hooks/useProgress";
import { useContext, useState } from "react";
import { SettingsContext } from "../context/SettingsContext";
import { getQuoteOfTheDay } from "../utils/quotes";
import HabitList from "../components/HabitList";
import AddHabitForm from "../components/AddHabitForm";
import ProgressBar from "../components/ProgressBar";
import EditPastDaysDialog from "../components/EditPastDaysDialog";
import { supabase } from "../supabaseClient";
import { toggleHabit } from "../utils/habitUtils";
import { AuthContext } from "../context/AuthContext";

function Today() {
  const { habits, setHabits } = useHabits();
  const { weekday, isoDate } = useToday();
  const { progress } = useProgress(habits);
  const { sortOrder } = useContext(SettingsContext);
  const { showQuote } = useContext(SettingsContext);
  const { isGuest } = useContext(AuthContext);
  const [showEditDialog, setShowEditDialog] = useState(false);

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

  const toggleHabitStatus = async (id) => {
    if (isGuest) {
      const updated = toggleHabit(habits, id, isoDate);
      setHabits(updated);
      localStorage.setItem("guest_habits", JSON.stringify(updated));
      return;
    }

    const habit = habits.find((h) => h.id === id);
    if (!habit) return;

    const current = habit.history?.[isoDate] === true;
    const newCompleted = !current;

    // Check if history row exists
    const { data: existing, error: fetchError } = await supabase
      .from("habit_history")
      .select("id")
      .eq("habit_id", id)
      .eq("date", isoDate)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      console.error("Failed to check history:", fetchError.message);
      return;
    }

    if (existing) {
      // Update
      const { error } = await supabase
        .from("habit_history")
        .update({ completed: newCompleted })
        .eq("id", existing.id);
      if (error) {
        console.error("Failed to update habit history:", error.message);
        return;
      }
    } else {
      // Insert
      const { error } = await supabase.from("habit_history").insert({
        habit_id: id,
        date: isoDate,
        completed: newCompleted,
      });
      if (error) {
        console.error("Failed to insert habit history:", error.message);
        return;
      }
    }

    // Update local state
    setHabits((prev) =>
      prev.map((h) =>
        h.id === id
          ? {
              ...h,
              completedToday: newCompleted,
              history: {
                ...h.history,
                [isoDate]: newCompleted,
              },
            }
          : h
      )
    );
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
