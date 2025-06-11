import { useState } from "react";
import { useHabits } from "../hooks/useHabits";
import { useDeleteDialog } from "../hooks/useDeleteDialog";
import GeneralSettings from "../components/settings/GeneralSettings";
import HabitSettings from "../components/settings/HabitSettings";
import ConfirmationDialog from "../components/ConfirmationDialog";

function Settings() {
  const { habits, setHabits } = useHabits();
  const { openDeleteDialog } = useDeleteDialog();
  const [showClearHistoryDialog, setShowClearHistoryDialog] = useState(false);
  const [showDeleteAllDialog, setShowDeleteAllDialog] = useState(false);
  const [habitToClear, setHabitToClear] = useState(null);

  return (
    <div className="space-y-8">
      {/* General Settings */}
      <GeneralSettings
        onClearHistoryClick={() => setShowClearHistoryDialog(true)}
        onDeleteAllClick={() => setShowDeleteAllDialog(true)}
      />

      {/* Habit Settings */}
      <HabitSettings
        habits={habits}
        setHabits={setHabits}
        openDeleteDialog={openDeleteDialog}
        setHabitToClear={setHabitToClear}
      />

      {/* Dialogs */}
      <ConfirmationDialog
        isOpen={showClearHistoryDialog}
        onClose={() => setShowClearHistoryDialog(false)}
        onConfirm={() => {
          const cleared = habits.map((h) => ({
            ...h,
            completedToday: false,
            history: {},
          }));
          setHabits(cleared);
          setShowClearHistoryDialog(false);
        }}
        title="Clear All Habit History?"
        message="This will erase all history data for every habit. Your habits will remain, but all past completions will be lost."
        confirmLabel="Clear History"
      />

      <ConfirmationDialog
        isOpen={showDeleteAllDialog}
        onClose={() => setShowDeleteAllDialog(false)}
        onConfirm={() => {
          setHabits([]);
          setShowDeleteAllDialog(false);
        }}
        title="Delete All Habits?"
        message="This will delete all your habits and their history. This action cannot be undone."
        confirmLabel="Delete Everything"
      />

      <ConfirmationDialog
        isOpen={habitToClear !== null}
        onClose={() => setHabitToClear(null)}
        onConfirm={() => {
          if (habitToClear) {
            setHabits((prev) =>
              prev.map((h) =>
                h.id === habitToClear.id
                  ? { ...h, history: {}, completedToday: false }
                  : h
              )
            );
          }
          setHabitToClear(null);
        }}
        title={`Clear History for "${habitToClear?.name}"?`}
        message="This will erase all progress and streaks for this habit, but the habit itself will remain."
        confirmLabel="Clear History"
      />
    </div>
  );
}

export default Settings;
