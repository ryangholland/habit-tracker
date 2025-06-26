import ConfirmationDialog from "../common/ConfirmationDialog";
import { useDeleteDialog } from "../../hooks/useDeleteDialog";
import { useHabits } from "../../hooks/useHabits";

function DeleteHabitDialog() {
  const { habitToDelete, isOpen, closeDialog } = useDeleteDialog();
  const { deleteHabit } = useHabits();

  const handleConfirm = () => {
    if (habitToDelete) {
      deleteHabit(habitToDelete.id);
    }
    closeDialog();
  };

  return (
    <ConfirmationDialog
      isOpen={isOpen}
      onClose={closeDialog}
      onConfirm={handleConfirm}
      title="Delete this habit?"
      message={
        habitToDelete
          ? `Are you sure you want to delete "${habitToDelete.name}"? This will remove all history.`
          : ""
      }
      confirmLabel="Delete"
    />
  );
}

export default DeleteHabitDialog;
