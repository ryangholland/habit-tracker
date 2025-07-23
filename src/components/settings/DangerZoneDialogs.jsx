import ConfirmationDialog from "../common/ConfirmationDialog";
import { supabase } from "../../supabaseClient";

function DangerZoneDialogs({
  habits,
  setHabits,
  isGuest,
  showClearHistoryDialog,
  setShowClearHistoryDialog,
  showDeleteAllDialog,
  setShowDeleteAllDialog,
  habitToClear,
  setHabitToClear,
}) {
  // Clear all history
  const handleClearAllHistory = async () => {
    // Optimistic UI update
    const cleared = habits.map((h) => ({
      ...h,
      completedToday: false,
      history: {},
    }));
    setHabits(cleared);

    if (isGuest) {
      localStorage.setItem("guest_habits", JSON.stringify(cleared));
    } else {
      try {
        const habitIds = habits.map((h) => h.id);
        await supabase
          .from("habit_history")
          .delete()
          .in("habit_id", habitIds);
      } catch (err) {
        console.error("Failed to clear all habit history:", err);
      }
    }

    setShowClearHistoryDialog(false);
  };

  // Delete all habits
  const handleDeleteAllHabits = async () => {
    // Optimistic UI update
    setHabits([]);

    if (isGuest) {
      localStorage.setItem("guest_habits", JSON.stringify([]));
    } else {
      try {
        const habitIds = habits.map((h) => h.id);

        // Delete history first (due to FK constraint), then habits
        await supabase
          .from("habit_history")
          .delete()
          .in("habit_id", habitIds);

        await supabase.from("habits").delete().in("id", habitIds);
      } catch (err) {
        console.error("Failed to delete all habits:", err);
      }
    }

    setShowDeleteAllDialog(false);
  };

  // Clear history for single habit
  const handleClearSingleHistory = async () => {
    if (!habitToClear) return;

    // Optimistic update
    const updated = habits.map((h) =>
      h.id === habitToClear.id
        ? { ...h, completedToday: false, history: {} }
        : h
    );
    setHabits(updated);

    if (isGuest) {
      localStorage.setItem("guest_habits", JSON.stringify(updated));
    } else {
      try {
        await supabase
          .from("habit_history")
          .delete()
          .eq("habit_id", habitToClear.id);
      } catch (err) {
        console.error("Failed to clear single habit history:", err);
      }
    }

    setHabitToClear(null);
  };

  return (
    <>
      {/* Clear All History Dialog */}
      <ConfirmationDialog
        isOpen={showClearHistoryDialog}
        onClose={() => setShowClearHistoryDialog(false)}
        onConfirm={handleClearAllHistory}
        title="Clear All Habit History?"
        message="This will erase all history data for every habit. Your habits will remain, but all past completions will be lost."
        confirmLabel="Clear History"
      />

      {/* Delete All Data Dialog */}
      <ConfirmationDialog
        isOpen={showDeleteAllDialog}
        onClose={() => setShowDeleteAllDialog(false)}
        onConfirm={handleDeleteAllHabits}
        title="Delete All Habits?"
        message="This will delete all your habits and their history. This action cannot be undone."
        confirmLabel="Delete Everything"
      />

      {/* Clear Single Habit History Dialog */}
      <ConfirmationDialog
        isOpen={habitToClear !== null}
        onClose={() => setHabitToClear(null)}
        onConfirm={handleClearSingleHistory}
        title={`Clear History for "${habitToClear?.name}"?`}
        message="This will erase all progress and streaks for this habit, but the habit itself will remain."
        confirmLabel="Clear History"
      />
    </>
  );
}

export default DangerZoneDialogs;
