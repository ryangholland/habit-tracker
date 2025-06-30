import { useState, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { useHabits } from "../hooks/useHabits";
import { useDeleteDialog } from "../hooks/useDeleteDialog";
import { AuthContext } from "../context/AuthContext";
import GeneralSettings from "../components/settings/GeneralSettings";
import HabitSettings from "../components/settings/HabitSettings";
import DangerZoneDialogs from "../components/settings/DangerZoneDialogs";

function Settings() {
  const { habits, setHabits } = useHabits();
  const { isGuest } = useContext(AuthContext);
  const { openDeleteDialog } = useDeleteDialog();
  const [showClearHistoryDialog, setShowClearHistoryDialog] = useState(false);
  const [showDeleteAllDialog, setShowDeleteAllDialog] = useState(false);
  const [habitToClear, setHabitToClear] = useState(null);
  const [searchParams] = useSearchParams();
  const initialHabitId = searchParams.get("habitId");

  return (
    <div className="space-y-8">
      <GeneralSettings
        onClearHistoryClick={() => setShowClearHistoryDialog(true)}
        onDeleteAllClick={() => setShowDeleteAllDialog(true)}
      />

      <HabitSettings
        habits={habits}
        setHabits={setHabits}
        openDeleteDialog={openDeleteDialog}
        setHabitToClear={setHabitToClear}
        initiallyExpandedId={initialHabitId}
      />

      <DangerZoneDialogs
        habits={habits}
        setHabits={setHabits}
        isGuest={isGuest}
        showClearHistoryDialog={showClearHistoryDialog}
        setShowClearHistoryDialog={setShowClearHistoryDialog}
        showDeleteAllDialog={showDeleteAllDialog}
        setShowDeleteAllDialog={setShowDeleteAllDialog}
        habitToClear={habitToClear}
        setHabitToClear={setHabitToClear}
      />
    </div>
  );
}

export default Settings;
