import ConfirmationDialog from "../common/ConfirmationDialog";

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
  return (
    <>
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
          if (isGuest) {
            localStorage.setItem("guest_habits", JSON.stringify(cleared));
          }
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
          if (isGuest) {
            localStorage.setItem("guest_habits", JSON.stringify([]));
          }
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
            const updated = habits.map((h) =>
              h.id === habitToClear.id
                ? { ...h, history: {}, completedToday: false }
                : h
            );
            setHabits(updated);
            if (isGuest) {
              localStorage.setItem("guest_habits", JSON.stringify(updated));
            }
          }
          setHabitToClear(null);
        }}
        title={`Clear History for "${habitToClear?.name}"?`}
        message="This will erase all progress and streaks for this habit, but the habit itself will remain."
        confirmLabel="Clear History"
      />
    </>
  );
}

export default DangerZoneDialogs;
