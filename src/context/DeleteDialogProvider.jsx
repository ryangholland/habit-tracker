import { useState } from "react";
import { DeleteDialogContext } from "./DeleteDialogContext";

export function DeleteDialogProvider({ children }) {
  const [habitToDelete, setHabitToDelete] = useState(null);

  const openDeleteDialog = (habit) => {
    setHabitToDelete(habit);
  };

  const closeDialog = () => {
    setHabitToDelete(null);
  };

  const isOpen = habitToDelete !== null;

  return (
    <DeleteDialogContext.Provider
      value={{ habitToDelete, isOpen, openDeleteDialog, closeDialog }}
    >
      {children}
    </DeleteDialogContext.Provider>
  );
}