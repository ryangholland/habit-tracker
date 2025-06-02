import { useContext } from "react";
import { DeleteDialogContext } from "../context/DeleteDialogContext";

export function useDeleteDialog() {
  const context = useContext(DeleteDialogContext);

  if (!context) {
    throw new Error(
      "useDeleteDialog must be used within a DeleteDialogProvider"
    );
  }

  return context;
}
